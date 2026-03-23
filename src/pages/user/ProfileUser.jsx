import React, { useState } from "react";
import { useGetUserProfileQuery } from "../../backend/features/user/userApi";
import ProfileForm from "./ProfileForm"; // On le renomme pour plus de clarté

export default function ProfileUser() {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading)
    return <div className="text-center py-20 font-bold">Chargement...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Erreur de chargement.
      </div>
    );

  // Si on est en mode édition, on affiche le formulaire de modification
  if (isEditing) {
    return (
      <div className="min-h-screen py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsEditing(false)}
            className="mb-6 text-sm font-bold text-sky-600 hover:underline"
          >
            ← Retour au profil
          </button>
          <ProfileForm user={user} onClose={() => setIsEditing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Profil */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 text-2xl font-black">
              {user?.first_name?.charAt(0) || "U"}
            </div>
          )}

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-gray-900 leading-tight">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-gray-500 font-medium">{user?.email}</p>
            <span className="inline-block mt-2 bg-sky-100 text-sky-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {user?.role || "Étudiant"}
            </span>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sky-600 transition-all shadow-lg shadow-gray-200 active:scale-95"
          >
            Modifier le profil
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Cours suivis",
              val: user?.stats?.totalCours || 0,
              color: "text-sky-600",
            },
            {
              label: "Certificats",
              val: user?.stats?.certificats || 0,
              color: "text-green-600",
            },
            {
              label: "Points d'XP",
              val: user?.stats?.points || 0,
              color: "text-purple-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
            >
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Liste des cours */}
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-8">
            Mes Cours en cours
          </h2>
          <div className="space-y-8">
            {user?.coursAchetés?.length > 0 ? (
              user.coursAchetés.map((cours) => (
                <div key={cours.id} className="group">
                  <div className="flex justify-between mb-3">
                    <span className="font-bold text-gray-800 group-hover:text-sky-600 transition-colors cursor-pointer">
                      {cours.titre}
                    </span>
                    <span className="text-sm font-black text-gray-400">
                      {cours.progression}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${cours.progression}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                Aucun cours pour le moment.
              </p>
            )}
          </div>

          <button className="mt-10 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50 transition-all">
            + Découvrir de nouveaux cours
          </button>
        </div>
      </div>
    </div>
  );
}
