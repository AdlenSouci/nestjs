import { useState } from "react";
import { api, setToken } from "../api/api";

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.login(email, password);
      if (data?.access_token) {
        setToken(data.access_token); // <-- met le token dans api.ts
        onLogin(data.access_token);   // <-- met le token dans App.tsx
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
