import React from "react";
import { useGetUserProfileQuery } from "../../backend/features/user/userApi";

export default function ProfileUser() {
  // Simulation des données utilisateur

  const { data: user } = useGetUserProfileQuery();

  return (
    <div className="min-h-scree py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Profil */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-50 object-cover"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-gray-900">{user?.nom}</h1>
            <p className="text-gray-500 font-medium">{user?.email}</p>
            <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {user?.role}
            </span>
          </div>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition-colors">
            Modifier le profil
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-medium">Cours suivis</p>
            <p className="text-2xl font-black text-blue-600">
              {user?.stats?.totalCours}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-medium">Certificats</p>
            <p className="text-2xl font-black text-green-600">
              {user?.stats?.certificats}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-medium">Points d'XP</p>
            <p className="text-2xl font-black text-purple-600">
              {user?.stats?.points}
            </p>
          </div>
        </div>

        {/* Liste des cours en cours */}
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Mes Cours en cours
          </h2>

          <div className="space-y-6">
            {user?.coursAchetés?.map((cours) => (
              <div key={cours.id} className="group">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors cursor-pointer">
                    {cours.titre}
                  </span>
                  <span className="text-sm font-bold text-gray-500">
                    {cours.progression}%
                  </span>
                </div>
                {/* Barre de progression */}
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${cours.progression}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-blue-400 hover:text-blue-500 transition-all">
            + Découvrir de nouveaux cours
          </button>
        </div>
      </div>
    </div>
  );
}
