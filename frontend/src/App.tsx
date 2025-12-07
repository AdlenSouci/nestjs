import { useState } from "react";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";
import { setToken } from "./api/api";

export default function App() {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem("token"));
  const [view, setView] = useState<"books" | "authors" | "categories">("books");

  if (token) {
    setToken(token);
  }

  const handleLogin = (tok: string) => {
    localStorage.setItem("token", tok);
    setToken(tok);
    setTokenState(tok);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTokenState(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 mb-4 flex gap-4 justify-center items-center">
        <div className="flex gap-4">
          <button 
            onClick={() => setView("books")} 
            className={`px-4 py-2 rounded ${view === "books" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Livres
          </button>
          <button 
            onClick={() => setView("authors")} 
            className={`px-4 py-2 rounded ${view === "authors" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Auteurs
          </button>
          <button 
            onClick={() => setView("categories")} 
            className={`px-4 py-2 rounded ${view === "categories" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Catégories
          </button>
        </div>

        <button 
          onClick={handleLogout} 
          className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 font-bold"
        >
          Déconnexion
        </button>
      </nav>

      <div className="container mx-auto">
        {view === "books" && <Books />}
        {view === "authors" && <Authors />}
        {view === "categories" && <Categories />}
      </div>
    </div>
  );
}