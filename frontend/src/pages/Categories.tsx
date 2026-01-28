import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCategory({ name });
      setName("");
      fetchCategories();
    } catch (err) {
      alert("Erreur création catégorie");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    try {
      await api.deleteCategory(id);
      fetchCategories();
    } catch (err: any) {
      console.error("Erreur suppression:", err);
      const errorMsg = err?.response?.data?.message || err?.message || "Erreur inconnue";
      alert(`Impossible de supprimer cette catégorie.\n\nRaison: ${errorMsg}\n\nAssurez-vous qu'aucun livre n'est associé à cette catégorie.`);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Gestion des Catégories</h2>

      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input
          className="border p-2 rounded w-full md:w-1/2"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Ajouter
        </button>
      </form>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-3 rounded flex justify-between items-center bg-gray-50">
            <span className="font-semibold">
              <span className="text-gray-400 mr-2">#{cat.id}</span>
              {cat.name}
            </span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}