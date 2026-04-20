const RAW_API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://api.vedantix.nl";

const API_BASE = String(RAW_API_BASE).replace(/\/$/, "");

const DEFAULT_TENANT_ID =
  import.meta.env.VITE_TENANT_ID || "default";

/**
 * @param {{
 *  apiKey?: string,
 *  actorId?: string,
 *  source?: string,
 *  idempotencyKey?: string
 * }} params
 */
function buildHeaders(params = {}) {
  const {
    apiKey,
    actorId = "admin-dashboard",
    source = "ADMIN_PANEL",
    idempotencyKey,
  } = params;

  const headers = {
    "Content-Type": "application/json",
    "X-Tenant-Id": DEFAULT_TENANT_ID,
    "X-Actor-Id": actorId,
    "X-Source": source,
  };

  if (apiKey) headers["X-Api-Key"] = apiKey;
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

  return headers;
}

function generateIdempotencyKey(prefix = "req") {
  if (window.crypto?.randomUUID) {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

/**
 * @param {Response} res
 */
async function parseResponse(res) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Invalid JSON response: ${text}`);
  }
}

/**
 * @param {{
 *  path: string,
 *  method?: string,
 *  body?: any,
 *  apiKey?: string,
 *  actorId?: string,
 *  source?: string,
 *  idempotency?: boolean
 * }} options
 */
async function request(options) {
  const {
    path,
    method = "GET",
    body,
    apiKey,
    actorId,
    source,
    idempotency = false,
  } = options;

  const idempotencyKey = idempotency
    ? generateIdempotencyKey(method.toLowerCase())
    : undefined;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: buildHeaders({
      apiKey,
      actorId,
      source,
      idempotencyKey,
    }),
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await parseResponse(res);

  if (!res.ok) {
    const message =
      json?.error ||
      json?.message ||
      `Request failed (${res.status})`;

    throw new Error(message);
  }

  return json?.data ?? json;
}

export const apiClient = {
  /**
   * @param {string} path
   * @param {object} options
   */
  get: (path, options = {}) =>
    request({ path, method: "GET", ...options }),

  /**
   * @param {string} path
   * @param {any} body
   * @param {object} options
   */
  post: (path, body, options = {}) =>
    request({ path, method: "POST", body, idempotency: true, ...options }),

  /**
   * @param {string} path
   * @param {any} body
   * @param {object} options
   */
  put: (path, body, options = {}) =>
    request({ path, method: "PUT", body, idempotency: true, ...options }),

  /**
   * @param {string} path
   * @param {object} options
   */
  delete: (path, options = {}) =>
    request({ path, method: "DELETE", idempotency: true, ...options }),
};