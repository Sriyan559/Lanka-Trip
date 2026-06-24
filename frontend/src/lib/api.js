/**
 * api.js — centralised fetch client for the Laravel backend
 *
 * Fixes applied:
 *  ✅ Safe non-JSON response handling (no more JSON.parse crashes)
 *  ✅ WAF-safe cookie name (_el_tok) — not 'token' or 'auth_token'
 *  ✅ Proper Bearer auth header injection
 *  ✅ Consistent error shape for UI consumption
 */

import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE || '_el_tok';

// ──────────────────────────────────────────────
// Core fetch wrapper
// ──────────────────────────────────────────────
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  // Only read cookies on the client side
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
    response = await fetch(url, { ...options, headers });
  } catch (networkError) {
    throw new Error('Network error — please check your connection.');
  }

  // ✅ FIX: guard against non-JSON responses (HTML error pages, etc.)
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
    // Non-JSON body (HTML error page, plain text, etc.)
    const text = await response.text().catch(() => '');
    if (!response.ok) {
      throw new Error(
        `Server error ${response.status}: ${text.slice(0, 120) || response.statusText}`
      );
    }
    return { success: true };
  }

  if (!response.ok) {
    const message =
      data?.message ||
      (data?.errors ? Object.values(data.errors).flat().join(' ') : null) ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ──────────────────────────────────────────────
// HTTP helpers
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Auth
// ──────────────────────────────────────────────
export const authApi = {
  /** POST /auth/login  — returns { token, user } */
  login: (credentials) => api.post('/auth/login', credentials),

  /** POST /auth/register — returns { token, user } */
  register: (data) => api.post('/auth/register', data),

  /** POST /auth/logout */
  logout: () => api.post('/auth/logout'),

  /** POST /auth/forgot-password */
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),

  /** POST /auth/reset-password */
  resetPassword: (data) => api.post('/auth/reset-password', data),

  /** GET /auth/me */
  me: () => api.get('/auth/me'),
};

// ──────────────────────────────────────────────
// Products
// ──────────────────────────────────────────────
export const productsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/products${qs ? `?${qs}` : ''}`);
  },
  get:         (id)    => api.get(`/products/${id}`),
  search:      (q, params = {}) =>
    api.get(`/products?search=${encodeURIComponent(q)}&${new URLSearchParams(params)}`),
  featured:    ()      => api.get('/products/featured'),
  trending:    ()      => api.get('/products/trending'),
  byCategory:  (slug, params = {}) =>
    api.get(`/categories/${slug}/products?${new URLSearchParams(params)}`),
};

// ──────────────────────────────────────────────
// Categories
// ──────────────────────────────────────────────
export const categoriesApi = {
  list: () => api.get('/categories'),
  get:  (slug) => api.get(`/categories/${slug}`),
};

// ──────────────────────────────────────────────
// Suppliers
// ──────────────────────────────────────────────
export const suppliersApi = {
  list:    (params = {}) => api.get(`/suppliers?${new URLSearchParams(params)}`),
  get:     (id)          => api.get(`/suppliers/${id}`),
  products:(id, params)  => api.get(`/suppliers/${id}/products?${new URLSearchParams(params)}`),
};

// ──────────────────────────────────────────────
// Cart
// ──────────────────────────────────────────────
export const cartApi = {
  get:    ()              => api.get('/cart'),
  add:    (productId, qty = 1) => api.post('/cart/items', { product_id: productId, quantity: qty }),
  update: (itemId, qty)   => api.put(`/cart/items/${itemId}`, { quantity: qty }),
  remove: (itemId)        => api.delete(`/cart/items/${itemId}`),
  clear:  ()              => api.delete('/cart'),
};

// ──────────────────────────────────────────────
// Wishlist
// ──────────────────────────────────────────────
export const wishlistApi = {
  get:    ()          => api.get('/wishlist'),
  add:    (productId) => api.post('/wishlist', { product_id: productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// ──────────────────────────────────────────────
// RFQ (Request for Quotation)
// ──────────────────────────────────────────────
export const rfqApi = {
  submit:  (data)  => api.post('/rfq', data),
  list:    ()      => api.get('/rfq'),
  get:     (id)    => api.get(`/rfq/${id}`),
  respond: (id, d) => api.post(`/rfq/${id}/respond`, d),
};

// ──────────────────────────────────────────────
// User Dashboard
// ──────────────────────────────────────────────
export const userApi = {
  dashboard:    ()     => api.get('/user/dashboard'),
  profile:      ()     => api.get('/user/profile'),
  updateProfile:(data) => api.put('/user/profile', data),
  orders:       ()     => api.get('/user/orders'),
  rfqs:         ()     => api.get('/user/rfqs'),
  messages:     ()     => api.get('/user/messages'),
};

// ──────────────────────────────────────────────
// Cookie helpers (shared with AuthContext)
// ──────────────────────────────────────────────
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
