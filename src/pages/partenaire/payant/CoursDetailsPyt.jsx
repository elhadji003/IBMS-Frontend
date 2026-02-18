import React from "react";
import { useParams } from "react-router-dom";
import { Lock, PlayCircle } from "lucide-react";
import { useGetCoursByIdQuery } from "../../../backend/features/formation/coursApi";

export default function CourseDetail() {
  const { id } = useParams();

  const { data: course, isLoading, error } = useGetCoursByIdQuery(id);

  if (isLoading) return <p className="text-center mt-20">Chargement...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Erreur</p>;

  const hasAccess = course.is_free || course.contents.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-black text-gray-900">{course.title}</h1>

        <p className="text-gray-600 mt-3">{course.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-black">
            {course.is_free ? "Gratuit" : `${course.price} FCFA`}
          </span>

          {!hasAccess && (
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700">
              Acheter
            </button>
          )}
        </div>

        <hr className="my-8" />

        <h2 className="text-xl font-bold mb-4">Contenu du cours</h2>

        {hasAccess ? (
          <ul className="space-y-3">
            {course.contents.map((content) => (
              <li
                key={content.id}
                className="flex items-center gap-3 p-4 border rounded-xl"
              >
                <PlayCircle className="text-green-500" />
                <span className="font-medium">{content.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3 p-6 bg-gray-100 rounded-xl">
            <Lock className="text-gray-500" />
            <p className="text-gray-600 font-medium">
              Contenu verrouillé – paiement requis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
