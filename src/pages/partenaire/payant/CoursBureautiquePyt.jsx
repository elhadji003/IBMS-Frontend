import React, { useState } from "react";

const COURS_BUREAUTIQUE = [
  {
    id: 1,
    titre: "Excel : De Débutant à Pro",
    categorie: "Excel",
    partenaire: "Tech Academy",
    thumbnail:
      "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400",
    duree: "10h 30min",
    prix: 25,
  },
  {
    id: 2,
    titre: "Word : Mise en page avancée",
    categorie: "Word",
    partenaire: "Design Studio",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400",
    duree: "05h 15min",
    prix: 15,
  },
  {
    id: 3,
    titre: "PowerPoint : Présentations Impactantes",
    categorie: "PowerPoint",
    partenaire: "Code Master",
    thumbnail:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
    duree: "08h 45min",
    prix: 20,
  },
  {
    id: 4,
    titre: "Excel : Tableaux Croisés Dynamiques",
    categorie: "Excel",
    partenaire: "Data Expert",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    duree: "04h 20min",
    prix: 30,
  },
];

const CATEGORIES = ["Tous", "Excel", "Word", "PowerPoint"];

export default function CoursBureautiquePyt() {
  const [filtre, setFiltre] = useState("Tous");

  // Logique de filtrage
  const coursFiltrés =
    filtre === "Tous"
      ? COURS_BUREAUTIQUE
      : COURS_BUREAUTIQUE.filter((c) => c.categorie === filtre);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Titre et Intro */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Cours <span className="text-sky-600">Bureautique</span>
          </h1>
          <p className="text-gray-600">
            Maîtrisez les outils indispensables du quotidien.
          </p>
        </div>

        {/* Barre de Filtres */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltre(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
                filtre === cat
                  ? "bg-sky-600 border-sky-600 text-white shadow-lg"
                  : "bg-white border-gray-200 text-gray-600 hover:border-sky-500 hover:text-sky-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille des cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursFiltrés.map((cours) => (
            <div
              key={cours.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image / Miniature Vidéo */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={cours.thumbnail}
                  alt={cours.titre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                  {cours.duree}
                </span>
                {/* Badge de prix sur l'image */}
                <span className="absolute top-3 left-3 bg-white text-gray-900 font-black px-3 py-1 rounded-full shadow-md text-sm">
                  {cours.prix}€
                </span>
              </div>

              {/* Infos du cours */}
              <div className="p-6">
                <p className="text-xs text-sky-600 font-bold uppercase tracking-widest mb-1">
                  {cours.partenaire} • {cours.categorie}
                </p>
                <h2 className="text-xl font-bold text-gray-900 leading-tight h-14 line-clamp-2">
                  {cours.titre}
                </h2>

                <button className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-sky-600 transform active:scale-95 transition-all shadow-md">
                  Acheter le cours
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message vide */}
        {coursFiltrés.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-medium">
              Aucun cours trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
