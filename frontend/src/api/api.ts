// api.ts

const API_URL = "http://localhost:3000/v1";

// Internal token management
let token: string | null = localStorage.getItem("auth_token");

// Callback for auth failures (401)
let onAuthFailure: (() => void) | null = null;

export const setAuthFailureCallback = (cb: () => void) => {
  onAuthFailure = cb;
};

export const setToken = (tok: string | null) => {
  token = tok;
  if (tok) {
    localStorage.setItem("auth_token", tok);
  } else {
    localStorage.removeItem("auth_token");
  }
};

export const getToken = () => token;

const authHeaders = (): Record<string, string> => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper for requests
const request = async (url: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...authHeaders(),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${url}`, {
    cache: "no-store",
    ...options,
    headers
  });

  if (res.status === 401) {
    if (onAuthFailure) onAuthFailure();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Error ${res.status}`);
  }

  return res.json();
};

// ---------------- API ------------------
export const api = {
  // ----- Auth -----
  login: async (email: string, password: string) => {
    // Login is special, doesn't use the generic wrapper to avoid circular auth logic potentially
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
  },

  // ----- Books -----
  getBooks: () => request("/book"),

  createBook: (data: any) => request("/book", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  updateBook: (id: number, data: any) => request(`/book/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  deleteBook: async (id: number) => {
    await request(`/book/${id}`, { method: "DELETE" });
  },

  // ----- Authors -----
  getAuthors: () => request("/authors"),

  createAuthor: (data: any) => request("/authors", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  updateAuthor: (id: number, data: any) => request(`/authors/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),

  deleteAuthor: async (id: number) => {
    await request(`/authors/${id}`, { method: "DELETE" });
  },

  // ----- Categories -----
  getCategories: () => request("/categories"),

  createCategory: (data: any) => request("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  updateCategory: (id: number, data: any) => request(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),

  deleteCategory: async (id: number) => {
    await request(`/categories/${id}`, { method: "DELETE" });
  },
};
