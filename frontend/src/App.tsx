import { useState } from "react";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Categories from "./pages/Categories";

export default function App() {
  const [token, setTokenState] = useState<string | null>(null);
  const [view, setView] = useState<"books" | "authors" | "categories">("books");

  if (!token) {
    return <Login onLogin={(tok) => setTokenState(tok)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 mb-4 flex gap-4 justify-center">
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
      </nav>

      <div className="container mx-auto">
        {view === "books" && <Books />}
        {view === "authors" && <Authors />}
        {view === "categories" && <Categories />}
      </div>
    </div>
  );
}