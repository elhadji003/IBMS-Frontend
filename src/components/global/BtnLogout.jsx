import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../backend/features/auth/authApi";
import { resetApp } from "../../backend/resetActions";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";

const BtnLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutBackend, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      // On tente de prévenir le backend (Optionnel mais recommandé pour la Blacklist)
      await logoutBackend({ refresh }).unwrap();
    } catch (err) {
      console.warn("Déconnexion backend échouée ou token expiré");
    } finally {
      // Dans tous les cas (succès ou erreur API), on vide l'application
      await dispatch(resetApp());
      navigate("/login");
      toast.success("À bientôt !");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-4 py-2 rounded text-sm flex items-center gap-2 transition-colors 
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500 hover:text-white text-gray-700"}`}
    >
      <LogOutIcon className={`w-4 h-4 ${isLoading ? "animate-pulse" : ""}`} />
      <span className="hidden md:block">
        {isLoading ? "Déconnexion..." : "Déconnexion"}
      </span>
    </button>
  );
};

export default BtnLogout;
