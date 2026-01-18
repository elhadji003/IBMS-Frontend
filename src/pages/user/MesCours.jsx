import React from "react";
import { PlayCircle, Clock, BookOpen } from "lucide-react";

const COURS_ACHETES = [
  {
    id: 1,
    titre: "Formation Complète React.js 2024",
    instructeur: "Jean Codeur",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    progression: 65, // en pourcentage
    totalLecons: 24,
    leconsTerminees: 16,
  },
  {
    id: 2,
    titre: "Maîtriser Tailwind CSS de A à Z",
    instructeur: "Marie Design",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop",
    progression: 10,
    totalLecons: 12,
    leconsTerminees: 1,
  },
];

export default function MesCours() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes Apprentissages</h1>
        <p className="text-gray-500 mt-2">
          Continuez votre progression là où vous vous êtes arrêté.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURS_ACHETES.map((cours) => (
          <div
            key={cours.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Miniature avec Overlay */}
            <div className="relative group h-48">
              <img
                src={cours.image}
                alt={cours.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <PlayCircle
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  size={48}
                />
              </div>
            </div>

            {/* Contenu de la carte */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 leading-tight h-12">
                {cours.titre}
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4 flex items-center gap-1">
                <BookOpen size={14} /> {cours.instructeur}
              </p>

              {/* Barre de Progression */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-blue-600">
                    {cours.progression}% complété
                  </span>
                  <span className="text-gray-400">
                    {cours.leconsTerminees}/{cours.totalLecons} leçons
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${cours.progression}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <PlayCircle size={18} />
                {cours.progression > 0 ? "Continuer" : "Commencer"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
