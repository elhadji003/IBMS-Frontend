import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useGetCoursPartenairesQuery } from "../../../backend/features/formation/coursApi";

export default function CoursProgrammationPyt() {
  const { data, error, isLoading } = useGetCoursPartenairesQuery();
  const cours = data?.results || [];

  if (isLoading) return <p className="text-center mt-20">Chargement...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">Erreur réseau</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Mes Formations <span className="text-sky-600">Dev</span>
          </h1>
          <p className="text-gray-600">
            Apprends le code avec des projets concrets.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cours.map((c) => {
            // Sécurité : vérifie is_purchased à la racine OU dans le premier contenu
            const isPurchased =
              c.is_purchased ||
              (c.contents?.length > 0 && c.contents[0].is_purchased);
            const isOwned = isPurchased || c.is_free;

            return (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400"
                  className="w-full h-40 object-cover"
                  alt=""
                />

                <div className="p-5">
                  <span
                    className={`text-xs font-bold uppercase ${isOwned ? "text-green-500" : "text-sky-500"}`}
                  >
                    {isPurchased
                      ? "Possédé"
                      : c.is_free
                        ? "Gratuit"
                        : "Premium"}
                  </span>

                  <h3 className="text-xl font-bold text-gray-800 mt-2 line-clamp-1">
                    {c.title}
                  </h3>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      {isPurchased ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle size={16} strokeWidth={3} />
                          <span className="font-bold text-sm">Déjà acheté</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-black text-gray-900">
                          {c.is_free
                            ? "0 FCFA"
                            : `${c.price.toLocaleString()} FCFA`}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/user/cours/${c.id}/`}
                      className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                        isOwned
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-900 text-white hover:bg-sky-600"
                      }`}
                    >
                      {isOwned ? "Accéder" : "Acheter"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
