import React from "react";
import { BookOpen, Trophy, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardUser({ user }) {
  // Stats fictives pour le design
  const stats = [
    {
      label: "Cours en cours",
      value: "3",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Certificats",
      value: "1",
      icon: Trophy,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Heures apprises",
      value: "12h",
      icon: Clock,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header de bienvenue */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Ravi de vous revoir, {user?.first_name || "Étudiant"} ! 👋
        </h1>
        <p className="text-gray-500">
          Voici un aperçu de votre progression actuelle.
        </p>
      </div>

      {/* Grille de Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section: Continuer à apprendre (Gauche) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              Reprendre le cours
            </h2>
            <Link
              to="/user/courses"
              className="text-sm text-sky-600 hover:underline flex items-center gap-1"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center">
            <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="https://via.placeholder.com/150"
                alt="course"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                React.js pour Débutants
              </h3>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                <div className="bg-sky-500 h-2 rounded-full w-[45%]"></div>
              </div>
            </div>
            <button className="bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 transition">
              <TrendingUp size={20} />
            </button>
          </div>
        </div>

        {/* Section: Activité Récente (Droite) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Activité</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3 text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-sky-500"></div>
                <div>
                  <p className="text-gray-800 font-medium">
                    Quiz terminé : HTML Basics
                  </p>
                  <p className="text-gray-400 text-xs">Il y a 2 heures</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
