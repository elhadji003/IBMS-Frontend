import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/global/Sidebar";
import { Menu } from "lucide-react";
import Navbar from "../components/global/Navbar";
import { useSelector } from "react-redux";

export default function LayoutUser() {
  const user = useSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay mobile : s'affiche seulement quand le menu est ouvert sur petit écran */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar : Fixed sur mobile, Fixed aussi sur desktop pour le scroll indépendant */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* ^^^ Le md:pl-64 est CRUCIAL ici pour compenser la sidebar fixe */}

        {/* Header mobile (uniquement visible sur petit écran) */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:hidden sticky top-0 z-30">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <span className="ml-4 font-bold text-gray-800">IBMS</span>
          </div>
        </header>

        {/* Dans LayoutUser.jsx */}
        <div className="flex-1 flex flex-col">
          <Navbar user={user} />

          {/* Ajout de pt-20 pour laisser de la place à la Navbar fixe (h-16 + un peu d'espace) */}
          <main className="p-6 md:p-10 pt-20 md:pt-24 max-sm:p-4 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
