import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Service-role client — has write access, only used after password validation
function serviceClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

// Anon client — used only to verify the admin password from site_settings
function anonClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );
}

async function verifyPassword(password: string): Promise<boolean> {
  const { data } = await anonClient()
    .from("site_settings")
    .select("value")
    .eq("key", "admin_password")
    .maybeSingle();
  return data?.value === password;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url   = new URL(req.url);
    // Path: /admin-api/<table>  (optional /<id> suffix for update/delete)
    const parts = url.pathname.replace(/^\/admin-api\/?/, "").split("/").filter(Boolean);
    const table = parts[0];
    const rowId = parts[1];

    const ALLOWED_TABLES = new Set([
      "portfolio_projects",
      "certificates",
      "site_settings",
      "site_sections",
      "gallery_items",
      "blog_posts",
      "achievements",
      "portfolio_content",
    ]);

    if (!table || !ALLOWED_TABLES.has(table)) {
      return json({ error: "Unknown table" }, 400);
    }

    const body = req.method !== "GET" && req.method !== "DELETE" && req.headers.get("content-length") !== "0"
      ? await req.json()
      : {};

    // Every mutating request must carry { password, ...payload }
    if (req.method !== "GET") {
      if (!body.password) return json({ error: "Missing password" }, 401);
      const ok = await verifyPassword(body.password);
      if (!ok) return json({ error: "Invalid password" }, 403);
    }

    const db = serviceClient();

    // ── GET ──────────────────────────────────────────────────────────────────
    if (req.method === "GET") {
      const { data, error } = await db.from(table).select("*").order("order_index");
      if (error) return json({ error: error.message }, 500);
      return json(data);
    }

    // ── POST (insert) ────────────────────────────────────────────────────────
    if (req.method === "POST") {
      const { password: _pw, ...payload } = body;
      const { data, error } = await db.from(table).insert(payload).select().maybeSingle();
      if (error) return json({ error: error.message }, 500);
      return json(data, 201);
    }

    // ── PUT (update) ─────────────────────────────────────────────────────────
    if (req.method === "PUT") {
      if (!rowId) return json({ error: "Missing row id" }, 400);
      const { password: _pw, ...payload } = body;
      const { data, error } = await db.from(table).update(payload).eq("id", rowId).select().maybeSingle();
      if (error) return json({ error: error.message }, 500);
      return json(data);
    }

    // ── DELETE ───────────────────────────────────────────────────────────────
    if (req.method === "DELETE") {
      if (!rowId) return json({ error: "Missing row id" }, 400);
      // Password in query param for DELETE (no body)
      const pw = url.searchParams.get("password");
      if (!pw) return json({ error: "Missing password" }, 401);
      const ok = await verifyPassword(pw);
      if (!ok) return json({ error: "Invalid password" }, 403);
      const { error } = await db.from(table).delete().eq("id", rowId);
      if (error) return json({ error: error.message }, 500);
      return json({ success: true });
    }

    return json({ error: "Method not allowed" }, 405);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
