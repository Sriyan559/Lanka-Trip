import Cookies from 'js-cookie';
import { loginUrlFor } from '../authRedirect';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  '/api';

if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn('NEXT_PUBLIC_API_BASE_URL is not set; using the same-origin /api proxy.');
}

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE || '_el_tok';
const PUBLIC_AUTH_ENDPOINTS = new Set([
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/logout',
]);

let sessionRedirectStarted = false;

export function withQuery(endpoint, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });

  const qs = query.toString();
  return `${endpoint}${qs ? `?${qs}` : ''}`;
}

export function uploadFormData(file, category) {
  const formData = new FormData();
  formData.append('file', file);

  if (category) {
    formData.append('category', category);
  }

  return formData;
}

function handleUnauthorized(endpoint, hadToken) {
  if (
    typeof window === 'undefined' ||
    !hadToken ||
    PUBLIC_AUTH_ENDPOINTS.has(endpoint) ||
    sessionRedirectStarted
  ) {
    return;
  }

  sessionRedirectStarted = true;
  clearAuthToken();
  window.dispatchEvent(new Event('auth:session-expired'));

  const returnUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.replace(loginUrlFor(returnUrl, 'session_expired'));
}

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = typeof window !== 'undefined' ? Cookies.get(COOKIE_NAME) : null;

  const headers = {
    Accept: 'application/json',
    ...(options.body && !(options.body instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(url, {
      ...options,
      credentials: options.credentials ?? 'include',
      headers,
      signal: options.signal || AbortSignal.timeout(options.timeout ?? 30000),
    });
  } catch {
    throw new Error('Network error — please check your connection.');
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  let data = null;
  if (isJson) {
    try {
      data = await response.json();
    } catch {
      throw new Error('Server returned malformed JSON.');
    }
  } else {
    const text = await response.text().catch(() => '');

    if (!response.ok) {
      throw new Error(
        `Server error ${response.status}: ${text.slice(0, 120) || response.statusText}`,
      );
    }

    return { success: true };
  }

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized(endpoint, Boolean(token));
    }

    const errors = data?.errors && typeof data.errors === 'object'
      ? data.errors
      : {};
    const message =
      data?.message ||
      (Object.keys(errors).length ? Object.values(errors).flat().join(' ') : null) ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    error.errors = errors;
    error.category = data?.error?.category || (
      response.status === 401 ? 'AUTH_REQUIRED'
        : response.status === 429 ? 'RATE_LIMITED'
          : response.status >= 500 ? 'API_UNAVAILABLE'
            : 'VALIDATION_ERROR'
    );
    error.referenceId = data?.reference_id || null;
    throw error;
  }

  return data;
}

export const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, { method: 'GET', ...options }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  patch: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { method: 'DELETE', ...options }),
};

export function saveAuthToken(token) {
  Cookies.set(COOKIE_NAME, token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
}

export function clearAuthToken() {
  Cookies.remove(COOKIE_NAME);
}

export function getAuthToken() {
  return typeof window !== 'undefined' ? Cookies.get(COOKIE_NAME) : null;
}
