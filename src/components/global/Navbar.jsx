import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, GraduationCap, CreditCard } from "lucide-react";

export default function Navbar({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 md:left-64 h-16 flex justify-between items-center px-8 bg-white border-b shadow-sm z-30 max-sm:hidden">
      <div className="font-semibold text-gray-700">
        Bienvenue, {user?.first_name || "Étudiant"} 👋
      </div>

      {/* Menu Principal avec Dropdown */}
      <ul className="flex items-center gap-8">
        <li className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Ferme si on clique ailleurs
            className="flex items-center gap-1 text-gray-600 hover:text-sky-600 font-medium transition-colors"
          >
            Cours
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Le Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
              <Link
                to="/user/cours/gratuits"
                className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50 text-gray-700 hover:text-sky-600 transition"
              >
                <GraduationCap size={18} className="text-sky-500" />
                <div className="flex flex-col">
                  <Link to="/user/cours/gratuits" className="font-bold text-sm">
                    Formations Gratuites
                  </Link>
                  <Link
                    to={"/user/cours/payants"}
                    className="text-[10px] text-gray-400"
                  >
                    Accès libre immédiat
                  </Link>
                </div>
              </Link>

              <div className="border-t border-gray-50 my-1"></div>

              <Link
                to="/user/cours/payants"
                className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition"
              >
                <CreditCard size={18} className="text-emerald-500" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Cours Premium</span>
                  <span className="text-[10px] text-gray-400">
                    Contenu certifiant
                  </span>
                </div>
              </Link>
            </div>
          )}
        </li>
      </ul>

      {/* Section Profil */}
      <ul className="flex gap-4 items-center">
        {user ? (
          <li className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-tighter font-bold">
                Étudiant
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold border-2 border-sky-100 shadow-sm">
              {user.first_name?.charAt(0)}
            </div>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-sky-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-sky-700 transition shadow-md"
            >
              Connexion
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
