import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../backend/features/auth/authApi";
import { resetApp } from "../../backend/resetActions";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";

const BtnLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutBackend] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutBackend().unwrap();
      await dispatch(resetApp());
      navigate("/login");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
      // console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div>
      {/* Bouton logout */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-red-500"
      >
        <LogOutIcon className="w-4 h-4" />
        <span className="hidden md:block lg:blocka">Déconnexion</span>
      </button>

      {/* Modal */}
    </div>
  );
};

export default BtnLogout;
