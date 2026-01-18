import React, { useState } from "react";

const COURS_DATA = [
  {
    id: 1,
    titre: "Python Débutant",
    categorie: "Python",
    prix: 29,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
  },
  {
    id: 2,
    titre: "Maîtriser HTML5/CSS3",
    categorie: "HTML/CSS",
    prix: 19,
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400",
  },
  {
    id: 3,
    titre: "Bootstrap 5 Expert",
    categorie: "Bootstrap",
    prix: 25,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400",
  },
  {
    id: 4,
    titre: "Django & Python",
    categorie: "Python",
    prix: 49,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
  },
  {
    id: 5,
    titre: "Flexbox et Grid CSS",
    categorie: "HTML/CSS",
    prix: 15,
    image: "https://images.unsplash.com/photo-1523437113738-bbd3ee09abb1?w=400",
  },
];

const CATEGORIES = ["Tous", "Python", "HTML/CSS", "Bootstrap"];

export default function CoursProgrammationPyt() {
  const [filtre, setFiltre] = useState("Tous");

  // Logique de filtrage
  const coursFiltrés =
    filtre === "Tous"
      ? COURS_DATA
      : COURS_DATA.filter((c) => c.categorie === filtre);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Mes Formations <span className="text-blue-600">Dev</span>
          </h1>
          <p className="text-gray-600">
            Apprends le code avec des projets concrets.
          </p>
        </div>

        {/* Barre de Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltre(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filtre === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille de Cours */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coursFiltrés.map((cours) => (
            <div
              key={cours.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={cours.image}
                alt={cours.titre}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  {cours.categorie}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  {cours.titre}
                </h3>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-black text-gray-900">
                    {cours.prix}€
                  </span>
                  <button className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun cours trouvé */}
        {coursFiltrés.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Aucun cours disponible pour cette catégorie.
          </p>
        )}
      </div>
    </div>
  );
}
