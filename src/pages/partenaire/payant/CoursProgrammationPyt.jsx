import React, { useState } from "react";
import { useGetCoursPartenairesQuery } from "../../../backend/features/formation/coursApi";
import { Link } from "react-router-dom";

const CATEGORIES = ["Tous"];

export default function CoursProgrammationPyt() {
  const [filtre, setFiltre] = useState("Tous");

  const { data, error, isLoading } = useGetCoursPartenairesQuery();

  const cours = data?.results || [];

  if (isLoading) {
    return <p className="text-center mt-20">Chargement des cours...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-500">
        Erreur lors du chargement des cours
      </p>
    );
  }

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

        {/* Grille de Cours */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cours.map((cours) => (
            <div
              key={cours.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400"
                alt={cours.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  {cours.is_free ? "Gratuit" : "Payant"}
                </span>

                <h3 className="text-xl font-bold text-gray-800 mt-2">
                  {cours.title}
                </h3>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-black text-gray-900">
                    {cours.is_free ? "0 FCFA" : `${cours.price} FCFA`}
                  </span>

                  <Link
                    to={`/user/cours/${cours.id}/`}
                    className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    {cours.is_free ? "Accéder" : "Acheter"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cours.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Aucun cours disponible.
          </p>
        )}
      </div>
    </div>
  );
}
