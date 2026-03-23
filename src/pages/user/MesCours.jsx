import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, BookOpen, Layout, GraduationCap } from "lucide-react";
import { useGetCoursPartenairesQuery } from "../../backend/features/formation/coursApi";

export default function MesCours() {
  const { data, error, isLoading } = useGetCoursPartenairesQuery();

  // On filtre pour ne garder que les cours achetés (is_purchased: true dans le premier contenu)
  // ou les cours gratuits
  const mesCoursAchetes =
    data?.results?.filter((c) => {
      const purchased =
        c.contents?.length > 0 ? c.contents[0].is_purchased : false;
      return purchased || c.is_free;
    }) || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-500 font-bold">
        Erreur lors de la récupération de vos cours.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <GraduationCap size={36} className="text-sky-600" />
            Mes Apprentissages
          </h1>
          <p className="text-gray-500 mt-2">
            Retrouvez ici toutes les formations que vous avez acquises.
          </p>
        </div>
        <Link
          to="/user/cours/payants"
          className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-sky-600 hover:text-white transition-all shadow-sm"
        >
          <Layout size={18} /> Voir le catalogue
        </Link>
      </div>

      {mesCoursAchetes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mesCoursAchetes.map((cours) => {
            // Calcul de base : nombre de leçons
            const nbLecons = cours.contents?.length || 0;

            return (
              <div
                key={cours.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Miniature */}
                <div className="relative group h-48 bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400"
                    alt={cours.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="text-white" size={50} />
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black bg-green-100 text-green-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {cours.is_free ? "Gratuit" : "Acheté"}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 leading-tight mb-2 line-clamp-2">
                    {cours.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={16} className="text-sky-500" />
                      {nbLecons} leçons
                    </span>
                  </div>

                  {/* Barre de progression visuelle (Statique à 0% en attendant le tracking) */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold text-gray-400">
                      <span>Progression</span>
                      <span className="text-sky-600">0%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-sky-600 h-2 rounded-full"
                        style={{ width: `0%` }}
                      ></div>
                    </div>
                  </div>

                  <Link
                    to={`/user/cours/${cours.id}/`}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                  >
                    <PlayCircle size={20} />
                    Commencer à apprendre
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* État vide si aucun achat */
        <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200">
          <div className="bg-sky-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="text-sky-400" size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            Aucun cours acquis
          </h2>
          <p className="text-gray-500 mt-3 mb-8 max-w-sm mx-auto">
            Vous n'avez pas encore de cours dans votre bibliothèque. Explorez
            nos formations pour commencer !
          </p>
          <Link
            to="/user/cours/payants"
            className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-sky-700 transition-all shadow-lg shadow-sky-200 inline-block"
          >
            Découvrir le catalogue
          </Link>
        </div>
      )}
    </div>
  );
}
