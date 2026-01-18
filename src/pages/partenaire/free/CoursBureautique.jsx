import React from "react";

// Exemple de données (plus tard, cela viendra de ton API/Base de données)
const COURS_PARTENAIRES = [
  {
    id: 1,
    titre: "Formation React Avancé",
    partenaire: "Tech Academy",
    thumbnail: "https://via.placeholder.com/300x180", // Remplace par l'image de la vidéo
    duree: "10h 30min",
  },
  {
    id: 2,
    titre: "Design UI/UX pour Débutants",
    partenaire: "Design Studio",
    thumbnail: "https://via.placeholder.com/300x180",
    duree: "05h 15min",
  },
  {
    id: 3,
    titre: "Maîtriser Node.js",
    partenaire: "Code Master",
    thumbnail: "https://via.placeholder.com/300x180",
    duree: "08h 45min",
  },
];

export default function CoursBureautique() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Cours Burautique
        </h1>

        {/* Grille des cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURS_PARTENAIRES.map((cours) => (
            <div
              key={cours.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image / Miniature Vidéo */}
              <div className="relative h-44 bg-gray-200">
                <img
                  src={cours.thumbnail}
                  alt={cours.titre}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {cours.duree}
                </span>
              </div>

              {/* Infos du cours */}
              <div className="p-5">
                <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                  {cours.partenaire}
                </p>
                <h2 className="text-xl font-bold text-gray-900 mt-2">
                  {cours.titre}
                </h2>

                <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Voir le cours
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
