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

function withQuery(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  return `${endpoint}${qs ? `?${qs}` : ''}`;
}

function uploadFormData(file, category) {
  const formData = new FormData();
  formData.append('file', file);

  if (category) {
    formData.append('category', category);
  }

  return formData;
}

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

export const supplierProductsApi = {
  list:   (params = {}) => api.get(withQuery('/supplier/products', params)),
  create: (payload)     => api.post('/supplier/products', payload),
  get:    (id)          => api.get(`/supplier/products/${id}`),
  update: (id, payload) => api.put(`/supplier/products/${id}`, payload),
  delete: (id)          => api.delete(`/supplier/products/${id}`),
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
  get:    ()           => api.get('/wishlist'),
  add:    (productId)  => api.post('/wishlist', { product_id: productId }),
  remove: (wishlistId) => api.delete(`/wishlist/${wishlistId}`),
};

// ──────────────────────────────────────────────
// RFQ (Request for Quotation)
// ──────────────────────────────────────────────
export const rfqApi = {
  list:         (params = {}) => api.get(withQuery('/rfqs', params)),
  get:          (id)          => api.get(`/rfqs/${id}`),
  submit:       (payload)     => api.post('/rfqs', payload),
  update:       (id, payload) => api.put(`/rfqs/${id}`, payload),
  delete:       (id)          => api.delete(`/rfqs/${id}`),
  supplierList: (params = {}) => api.get(withQuery('/supplier/rfqs', params)),
};

// ──────────────────────────────────────────────
// Quotations
// ──────────────────────────────────────────────
export const quotationsApi = {
  create:       (rfqId, payload) => api.post(`/rfqs/${rfqId}/quotations`, payload),
  listByRfq:    (rfqId, params = {}) =>
    api.get(withQuery(`/rfqs/${rfqId}/quotations`, params)),
  supplierList: (params = {}) => api.get(withQuery('/supplier/quotations', params)),
  get:          (id)          => api.get(`/quotations/${id}`),
  update:       (id, payload) => api.put(`/quotations/${id}`, payload),
  accept:       (id)          => api.post(`/quotations/${id}/accept`),
  reject:       (id)          => api.post(`/quotations/${id}/reject`),
};

// ──────────────────────────────────────────────
// Orders
// ──────────────────────────────────────────────
export const ordersApi = {
  list:         (params = {}) => api.get(withQuery('/orders', params)),
  get:          (id)          => api.get(`/orders/${id}`),
  create:       (quotationId) => api.post('/orders', { quotation_id: quotationId }),
  updateStatus: (id, status)  => api.put(`/orders/${id}/status`, { status }),
};

// ──────────────────────────────────────────────
// Uploads
// ──────────────────────────────────────────────
export const uploadApi = {
  uploadImage:    (file, category) =>
    api.post('/uploads/image', uploadFormData(file, category)),
  uploadDocument: (file, category) =>
    api.post('/uploads/document', uploadFormData(file, category)),
  deleteUpload:   (id) => api.delete(`/uploads/${id}`),
};

// ──────────────────────────────────────────────
// Notifications
// ──────────────────────────────────────────────
export const notificationsApi = {
  list:        (params = {}) => api.get(withQuery('/notifications', params)),
  markRead:    (id)          => api.put(`/notifications/${id}/read`),
  markAllRead: ()            => api.put('/notifications/read-all'),
};

// ──────────────────────────────────────────────
// Messaging
// ──────────────────────────────────────────────
export const conversationsApi = {
  list:   ()        => api.get('/conversations'),
  create: (payload) => api.post('/conversations', payload),
  get:    (id)      => api.get(`/conversations/${id}`),
};

export const messagesApi = {
  send:     (conversationId, message) =>
    api.post('/messages', { conversation_id: conversationId, message }),
  markRead: (id) => api.put(`/messages/${id}/read`),
};

// ──────────────────────────────────────────────
// Supplier company profile
// ──────────────────────────────────────────────
export const supplierProfileApi = {
  publicProfile:             (id)      => api.get(`/suppliers/${id}/company-profile`),
  getCompanyProfile:         ()        => api.get('/supplier/company-profile'),
  updateCompanyProfile:      (payload) => api.put('/supplier/company-profile', payload),
  listCertificates:          ()        => api.get('/supplier/certificates'),
  createCertificate:         (payload) => api.post('/supplier/certificates', payload),
  deleteCertificate:         (id)      => api.delete(`/supplier/certificates/${id}`),
  listVideos:                ()        => api.get('/supplier/videos'),
  createVideo:               (payload) => api.post('/supplier/videos', payload),
  deleteVideo:               (id)      => api.delete(`/supplier/videos/${id}`),
  listStrengths:             ()        => api.get('/supplier/strengths'),
  createStrength:            (payload) => api.post('/supplier/strengths', payload),
  deleteStrength:            (id)      => api.delete(`/supplier/strengths/${id}`),
  getProductionCapacity:     ()        => api.get('/supplier/production-capacity'),
  updateProductionCapacity:  (payload) =>
    api.put('/supplier/production-capacity', payload),
};

// ──────────────────────────────────────────────
// User Dashboard
// ──────────────────────────────────────────────
export const userApi = {
  dashboard:    ()     => api.get('/user/dashboard'),
  profile:      ()     => api.get('/user/profile'),
  updateProfile:(data) => api.put('/user/profile', data),
  updatePassword:(data) => api.put('/user/password', data),
  orders:       (params = {}) => ordersApi.list(params),
  rfqs:         (params = {}) => rfqApi.list(params),
  messages:     ()     => conversationsApi.list(),
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
