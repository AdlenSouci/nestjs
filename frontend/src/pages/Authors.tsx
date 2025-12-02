import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Authors() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const fetchAuthors = async () => {
    try {
      const data = await api.getAuthors();
      setAuthors(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAuthor({
        name,
        biography,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      });
      setName("");
      setBiography("");
      setBirthDate("");
      fetchAuthors();
    } catch (err) {
      alert("Erreur création auteur");
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Supprimer cet auteur ?")) return;
    try {
      await api.deleteAuthor(id);
      fetchAuthors();
    } catch (err) {
      alert("Impossible de supprimer");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Gestion des Auteurs</h2>

      <form onSubmit={handleCreate} className="mb-8 p-4 border rounded bg-gray-50">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            className="border p-2 rounded"
            placeholder="Nom de l'auteur"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Biographie"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Ajouter Auteur
        </button>
      </form>

      <ul className="space-y-2">
        {authors.map((author) => (
          <li key={author.id} className="border p-3 rounded flex justify-between items-center hover:bg-gray-50">
            <div>
              <span className="font-bold text-lg">{author.name}</span>
              <p className="text-sm text-gray-500">ID: {author.id}</p>
            </div>
            <button
              onClick={() => handleDelete(author.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}