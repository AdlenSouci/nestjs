const API_URL = "http://localhost:3000";

// Token interne géré par le front
let token: string | null = null;

export const setToken = (tok: string) => {
  token = tok;
};

// On renvoie toujours un objet avec des string, jamais vide ou undefined
const authHeaders = (): Record<string, string> => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // ----- Auth -----
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  // ----- Books -----
  getBooks: async () => {
    const res = await fetch(`${API_URL}/book`, { headers: authHeaders() });
    return res.json();
  },
  createBook: async (data: any) => {
    const res = await fetch(`${API_URL}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateBook: async (id: number, data: any) => {
    const res = await fetch(`${API_URL}/book/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteBook: async (id: number) => {
    await fetch(`${API_URL}/book/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },

  // ----- Authors -----
  getAuthors: async () => {
    const res = await fetch(`${API_URL}/authors`, { headers: authHeaders() });
    return res.json();
  },
  createAuthor: async (data: any) => {
    const res = await fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateAuthor: async (id: number, data: any) => {
    const res = await fetch(`${API_URL}/authors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteAuthor: async (id: number) => {
    await fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },

  // ----- Categories -----
  getCategories: async () => {
    const res = await fetch(`${API_URL}/categories`, { headers: authHeaders() });
    return res.json();
  },
  createCategory: async (data: any) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateCategory: async (id: number, data: any) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCategory: async (id: number) => {
    await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },
};
