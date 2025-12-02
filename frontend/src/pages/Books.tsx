import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const fetchData = async () => {
    const [bData, aData, cData] = await Promise.all([
      api.getBooks(),
      api.getAuthors(),
      api.getCategories()
    ]);
    setBooks(bData);
    setAuthors(aData);
    setCategories(cData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorId || !categoryId) {
      alert("Veuillez sélectionner un auteur et une catégorie");
      return;
    }

    try {
      await api.createBook({
        title,
        description,
        authorId: Number(authorId), // Convertit la string du select en nombre
        categoryId: Number(categoryId), // Convertit la string du select en nombre
        publishedDate: new Date(), // Envoie une date (qui sera convertie en string JSON)
        available: true,
      });
      setTitle("");
      setDescription("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création (Vérifie la console F12 > Network)");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Gestion des Livres</h1>

      <form onSubmit={handleCreate} className="mb-6 p-4 border rounded bg-gray-50 grid gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du livre"
          className="border p-2 rounded"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded"
        />

        <div className="flex gap-4">
          <select
            className="border p-2 rounded w-full"
            value={authorId}
            onChange={e => setAuthorId(e.target.value)}
            required
          >
            <option value="">Sélectionner un auteur</option>
            {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <select
            className="border p-2 rounded w-full"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Ajouter Livre
        </button>
      </form>

      <ul>
        {books.map((b) => (
          <li key={b.id} className="border p-3 mb-2 rounded flex justify-between bg-white">
            <div>
              <span className="font-bold">{b.title}</span>
              <div className="text-sm text-gray-500">
                {b.author?.name} | {b.category?.name}
              </div>
            </div>
            <button
              onClick={async () => {
                await api.deleteBook(b.id);
                fetchData();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}