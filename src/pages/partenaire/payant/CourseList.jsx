import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function CourseList({ cours }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cours.map((c) => {
        const hasAccess = c.is_purchased || c.is_free;

        return (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
          >
            <span
              className={`text-xs font-bold ${hasAccess ? "text-green-600" : "text-blue-600"}`}
            >
              {c.is_purchased ? "POSSÉDÉ" : c.is_free ? "GRATUIT" : "PREMIUM"}
            </span>

            <h3 className="text-xl font-bold mt-2">{c.title}</h3>

            <div className="flex items-center justify-between mt-6">
              {c.is_purchased ? (
                <div className="flex items-center text-green-600 font-bold">
                  <CheckCircle size={18} className="mr-1" /> Déjà acheté
                </div>
              ) : (
                <span className="text-xl font-black">
                  {c.price.toLocaleString()} FCFA
                </span>
              )}

              <Link
                to={`/user/cours/${c.id}/`}
                className={`px-6 py-2 rounded-xl font-bold ${
                  hasAccess
                    ? "bg-green-600 text-white"
                    : "bg-gray-900 text-white"
                }`}
              >
                {hasAccess ? "Accéder" : "Acheter"}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
