// Cloudflare Pages Function — API Key CRUD
// GET /api/dashboard/api-keys — list user's keys
// POST /api/dashboard/api-keys — generate new key
// DELETE /api/dashboard/api-keys — revoke a key

interface Env {
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
  'Content-Type': 'application/json',
};

// Plan-based daily limits
const PLAN_LIMITS: Record<string, number> = {
  pro: 10000,
  business: 50000,
  api_dev: 100000,
  api_biz: 500000,
  employer_starter: 10000,
  employer_pro: 50000,
};

async function getAuthUser(request: Request, env: Env): Promise<{ id: string; email: string } | null> {
  const cookies = request.headers.get('cookie') || '';
  const match = cookies.match(/sb-access-token=([^;]+)/);
  if (!match) return null;
  const res = await fetch(`${env.PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${match[1]}`, apikey: env.PUBLIC_SUPABASE_ANON_KEY },
  });
  if (!res.ok) return null;
  const user: any = await res.json();
  return { id: user.id, email: user.email };
}

async function getLeadId(env: Env, email: string): Promise<string | null> {
  const res = await fetch(
    `${env.PUBLIC_SUPABASE_URL}/rest/v1/crm_leads?email=eq.${encodeURIComponent(email)}&select=id`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!res.ok) return null;
  const rows: any[] = await res.json();
  return rows.length > 0 ? rows[0].id : null;
}

async function getUserPlan(env: Env, email: string): Promise<string> {
  const res = await fetch(
    `${env.PUBLIC_SUPABASE_URL}/rest/v1/subscriptions?select=plan,status&status=eq.active&order=created_at.desc&limit=1`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!res.ok) return 'free';
  const rows: any[] = await res.json();
  return rows.length > 0 ? rows[0].plan : 'free';
}

function generateApiKey(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `esk_live_${hex}`;
}

// GET — list user's API keys
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const user = await getAuthUser(context.request, context.env);
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'unauthorized', message: 'Authentication required' }),
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const leadId = await getLeadId(context.env, user.email);
  if (!leadId) {
    return new Response(
      JSON.stringify({ data: [], message: 'No API keys found. Generate one to get started.' }),
      { status: 200, headers: CORS_HEADERS }
    );
  }

  // Fetch API keys for this lead
  const res = await fetch(
    `${context.env.PUBLIC_SUPABASE_URL}/rest/v1/crm_api_keys?lead_id=eq.${leadId}&select=id,api_key,name,daily_limit,daily_usage,is_active,created_at,last_used_at&order=created_at.desc`,
    {
      headers: {
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Failed to fetch API keys' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  const keys: any[] = await res.json();

  // Mask API keys — only show prefix and last 4 chars
  const masked = keys.map((k: any) => ({
    id: k.id,
    api_key_masked: k.api_key
      ? `${k.api_key.substring(0, 13)}...${k.api_key.substring(k.api_key.length - 4)}`
      : null,
    name: k.name,
    daily_limit: k.daily_limit,
    daily_usage: k.daily_usage || 0,
    is_active: k.is_active,
    created_at: k.created_at,
    last_used_at: k.last_used_at,
  }));

  return new Response(JSON.stringify({ data: masked }), {
    status: 200,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'private, no-cache' },
  });
};

// POST — generate new API key
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const user = await getAuthUser(context.request, context.env);
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'unauthorized', message: 'Authentication required' }),
      { status: 401, headers: CORS_HEADERS }
    );
  }

  // Parse optional body
  let keyName = 'Default';
  try {
    const body: any = await context.request.json();
    if (body.name && typeof body.name === 'string') {
      keyName = body.name.substring(0, 100);
    }
  } catch {
    // No body or invalid JSON — use defaults
  }

  // Get or create lead
  let leadId = await getLeadId(context.env, user.email);
  if (!leadId) {
    // Create lead
    const createRes = await fetch(`${context.env.PUBLIC_SUPABASE_URL}/rest/v1/crm_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        email: user.email,
        source: 'api_key_generation',
        status: 'active',
      }),
    });
    if (createRes.ok) {
      const created: any[] = await createRes.json();
      leadId = created[0]?.id;
    }
    if (!leadId) {
      return new Response(
        JSON.stringify({ error: 'internal_error', message: 'Failed to create lead record' }),
        { status: 500, headers: CORS_HEADERS }
      );
    }
  }

  // Check existing active keys count (limit to 5)
  const countRes = await fetch(
    `${context.env.PUBLIC_SUPABASE_URL}/rest/v1/crm_api_keys?lead_id=eq.${leadId}&is_active=eq.true&select=id`,
    {
      headers: {
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (countRes.ok) {
    const existing: any[] = await countRes.json();
    if (existing.length >= 5) {
      return new Response(
        JSON.stringify({
          error: 'limit_reached',
          message: 'Maximum 5 active API keys allowed. Revoke an existing key first.',
        }),
        { status: 400, headers: CORS_HEADERS }
      );
    }
  }

  // Determine daily limit from plan
  const plan = await getUserPlan(context.env, user.email);
  const dailyLimit = PLAN_LIMITS[plan] || 1000;

  // Generate and insert
  const apiKey = generateApiKey();

  const insertRes = await fetch(`${context.env.PUBLIC_SUPABASE_URL}/rest/v1/crm_api_keys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      lead_id: leadId,
      api_key: apiKey,
      name: keyName,
      daily_limit: dailyLimit,
      daily_usage: 0,
      is_active: true,
    }),
  });

  if (!insertRes.ok) {
    const errText = await insertRes.text();
    console.error('Failed to insert API key:', errText);
    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Failed to generate API key' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  const inserted: any[] = await insertRes.json();
  const record = inserted[0];

  return new Response(
    JSON.stringify({
      message: 'API key created successfully. Store it securely — it will not be shown again in full.',
      data: {
        id: record.id,
        api_key: apiKey,
        name: keyName,
        daily_limit: dailyLimit,
        plan,
        created_at: record.created_at,
      },
    }),
    { status: 201, headers: { ...CORS_HEADERS, 'Cache-Control': 'private, no-cache' } }
  );
};

// DELETE — revoke an API key
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const user = await getAuthUser(context.request, context.env);
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'unauthorized', message: 'Authentication required' }),
      { status: 401, headers: CORS_HEADERS }
    );
  }

  // Parse key ID from body or query
  let keyId: string | null = null;
  const url = new URL(context.request.url);
  keyId = url.searchParams.get('id');

  if (!keyId) {
    try {
      const body: any = await context.request.json();
      keyId = body.id || null;
    } catch {
      // No body
    }
  }

  if (!keyId) {
    return new Response(
      JSON.stringify({ error: 'missing_id', message: 'Provide the API key "id" to revoke (query param or body)' }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Verify the key belongs to this user
  const leadId = await getLeadId(context.env, user.email);
  if (!leadId) {
    return new Response(
      JSON.stringify({ error: 'not_found', message: 'API key not found' }),
      { status: 404, headers: CORS_HEADERS }
    );
  }

  // Check ownership
  const checkRes = await fetch(
    `${context.env.PUBLIC_SUPABASE_URL}/rest/v1/crm_api_keys?id=eq.${keyId}&lead_id=eq.${leadId}&select=id,is_active`,
    {
      headers: {
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  if (!checkRes.ok) {
    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Failed to verify key ownership' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  const checkRows: any[] = await checkRes.json();
  if (checkRows.length === 0) {
    return new Response(
      JSON.stringify({ error: 'not_found', message: 'API key not found or does not belong to your account' }),
      { status: 404, headers: CORS_HEADERS }
    );
  }

  if (!checkRows[0].is_active) {
    return new Response(
      JSON.stringify({ error: 'already_revoked', message: 'This API key has already been revoked' }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // Revoke: set is_active=false
  const revokeRes = await fetch(
    `${context.env.PUBLIC_SUPABASE_URL}/rest/v1/crm_api_keys?id=eq.${keyId}&lead_id=eq.${leadId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: context.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ is_active: false }),
    }
  );

  if (!revokeRes.ok) {
    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Failed to revoke API key' }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  return new Response(
    JSON.stringify({ message: 'API key revoked successfully', id: keyId }),
    { status: 200, headers: { ...CORS_HEADERS, 'Cache-Control': 'private, no-cache' } }
  );
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: CORS_HEADERS });
};
