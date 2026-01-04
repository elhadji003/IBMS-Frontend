import React from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FeatureCard } from "../../components/FeatureCard";

// Import de tes assets (ajoute tes images ici)
import informatique from "../../assets/image.png";
import marketing from "../../assets/marketing.png";
import programmation from "../../assets/programmation.png";
import infographe from "../../assets/infographe.png";
import ia from "../../assets/ia.png";
import cb from "../../assets/cb.png";
import { useNavigate } from "react-router-dom";

export default function Acceuil() {
  const courses = [
    {
      id: 1,
      title: "Informatique Bureautique",
      desc: "Maîtrisez Word, PowerPoint, Excel et les outils de productivité.",
      category: "Bureautique",
      image: informatique,
    },
    {
      id: 2,
      title: "Infographie Créative",
      desc: "Apprenez le design pro avec Adobe Photoshop et Illustrator.",
      category: "Design",
      image: infographe,
    },
    {
      id: 3,
      title: "Programmation Web & Logiciel",
      desc: "Devenez développeur : HTML, CSS, Javascript, Python.",
      category: "Développement",
      image: programmation,
    },
    {
      id: 4,
      title: "Marketing Digital",
      desc: "Stratégies réseaux sociaux, SEO et publicité en ligne.",
      category: "Marketing",
      image: marketing,
    },
    {
      id: 5,
      title: "Intelligence Artificielle",
      desc: "Comprendre et utiliser les outils d'IA pour booster son travail.",
      category: "Technologie",
      image: ia,
    },
    {
      id: 6,
      title: "Sécurité Numérique",
      desc: "Protégez vos données et apprenez les bases de la cybersécurité.",
      category: "Sécurité",
      image: cb,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-sky-600 py-20 px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Propulsez votre carrière avec{" "}
            <span className="text-sky-200">IBMS-Learning</span>
          </h1>
          <p className="text-sky-100 mt-6 text-xl opacity-90">
            Formations certifiantes en Informatique, Design et Nouvelles
            Technologies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Features Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          <FeatureCard
            icon={GraduationCap}
            title="Espace Étudiant"
            description="Accédez à vos cours, bulletins, et historique de paiements en un seul clic."
          />
          <FeatureCard
            icon={Clock}
            title="Apprentissage Simplifié"
            description="Suivi des notes, présence et documents administratifs automatisés."
          />
          <FeatureCard
            icon={LayoutDashboard}
            title="Tableau de Bord"
            description="Visualisez votre progression en temps réel sur tous vos modules."
          />
        </div>

        {/* Courses Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Nos Formations
              </h2>
              <p className="text-gray-500 mt-2">
                Découvrez nos programmes conçus par des experts.
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-sky-100 text-sky-700 px-6 py-3 rounded-full font-bold hover:bg-sky-200 transition-colors"
            >
              Voir tout le catalogue <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-sky-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase group-hover:animate-pulse">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {course.desc}
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-all"
                  >
                    Découvrir le module
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="bg-white py-12 border-t mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-900 font-bold text-lg">IBMS-Learning</p>
            <p className="text-gray-500 text-sm">
              Plateforme d'excellence académique.
            </p>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tous droits réservés.
          </div>

          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-sky-600 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
