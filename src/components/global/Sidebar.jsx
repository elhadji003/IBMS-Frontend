import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Settings,
  CreditCard,
  User2,
} from "lucide-react";
import BtnLogout from "./BtnLogout";

const menuItems = [
  { icon: LayoutDashboard, label: "Tableau de Bord", path: "/user/dashboard" },
  { icon: User2, label: "Profile", path: "/user/profile" },
  { icon: BookOpen, label: "Mes Cours", path: "/user/courses" },
  {
    icon: GraduationCap,
    label: "Ma Certification",
    path: "/user/certification",
  },
  { icon: CreditCard, label: "Paiements", path: "/dashboard/billing" },
];

export default function Sidebar({ closeMobileMenu }) {
  const location = useLocation();

  return (
    /* Ajout de :
       - fixed : pour fixer la sidebar
       - inset-y-0 : pour qu'elle prenne toute la hauteur (top 0 et bottom 0)
       - left-0 : collée à gauche
       - w-64 : une largeur fixe (tu peux l'ajuster)
       - z-50 : pour qu'elle passe au dessus du contenu sur mobile
    */
    <div className="fixed inset-y-0 left-0 w-64 h-full flex flex-col border-r border-gray-100 bg-white z-50">
      {/* Logo */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sky-600">IBMS</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-sky-50 text-sky-600 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <BtnLogout />
      </div>
    </div>
  );
}
