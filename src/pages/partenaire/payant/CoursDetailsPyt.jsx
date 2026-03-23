import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Lock,
  PlayCircle,
  FileText,
  Download,
  CheckCircle,
} from "lucide-react";
import { useGetCoursByIdQuery } from "../../../backend/features/formation/coursApi";

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, isLoading, error } = useGetCoursByIdQuery(id);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    if (course?.contents?.length > 0) {
      setSelectedContent(course.contents[0]);
    }
  }, [course]);

  if (isLoading)
    return (
      <p className="text-center mt-20 font-bold">Chargement du cours...</p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500">
        Erreur de connexion au serveur
      </p>
    );

  // L'utilisateur a accès si le cours est gratuit OU s'il l'a acheté
  // On vérifie is_purchased sur le premier contenu ou le cours lui-même selon ton API
  const hasAccess = course.is_free || course.contents?.[0]?.is_purchased;

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 1. ZONE DE LECTURE (S'affiche si accès) */}
        <div className="mb-8">
          {hasAccess && selectedContent ? (
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-black aspect-video border-4 border-white">
              {selectedContent.content_type === "video_youtube" && (
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(selectedContent.video_url)}
                  title={selectedContent.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}

              {selectedContent.content_type === "video_native" && (
                <video
                  controls
                  className="w-full h-full"
                  controlsList="nodownload"
                >
                  <source src={selectedContent.video_file} type="video/mp4" />
                </video>
              )}

              {selectedContent.content_type === "document" && (
                <div className="h-full bg-white flex flex-col items-center justify-center p-10">
                  <FileText size={80} className="text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-6">
                    {selectedContent.title}
                  </h2>
                  <a
                    href={selectedContent.file}
                    download
                    className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download size={20} /> Télécharger le document
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Zone Verrouillée */
            <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white p-8 text-center border-4 border-gray-800">
              <Lock size={60} className="text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold">Contenu Protégé</h2>
              <p className="text-gray-400 mt-2">
                Veuillez acquérir ce cours pour débloquer les leçons.
              </p>
              {!hasAccess && (
                <button className="mt-6 bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                  Acheter pour {course.price.toLocaleString()} FCFA
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. INFOS DU COURS (Gauche) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <div className="flex items-center gap-2 mb-2">
                {hasAccess && (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <CheckCircle size={14} /> Accès débloqué
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-gray-900">
                {course.title}
              </h1>
              <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* 3. PLAYLIST / CONTENU (Droite) */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
              Programme du cours
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                {course.contents.length} leçons
              </span>
            </h2>

            <div className="space-y-3">
              {course.contents.map((item, index) => {
                const isActive = selectedContent?.id === item.id;
                const isVideo = item.content_type?.includes("video");

                return (
                  <button
                    key={item.id}
                    disabled={!hasAccess}
                    onClick={() => setSelectedContent(item)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      !hasAccess
                        ? "opacity-50 cursor-not-allowed"
                        : isActive
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                          : "border-gray-100 hover:border-blue-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
                    >
                      {isVideo ? (
                        <PlayCircle size={18} />
                      ) : (
                        <FileText size={18} />
                      )}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`text-sm font-bold ${isActive ? "text-blue-900" : "text-gray-700"}`}
                      >
                        {index + 1}. {item.title}
                      </p>
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        {isVideo ? "Vidéo" : "Document"}
                      </span>
                    </div>

                    {!hasAccess && <Lock size={14} className="text-gray-300" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
