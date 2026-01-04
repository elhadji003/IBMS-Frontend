// src/pages/Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Accès refusé
      </h1>
      <p className="mb-6">
        Vous n’avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link to="/login" className="text-blue-600 hover:underline">
        Veuillez-vous reconnecter
      </Link>
    </div>
  );
};

export default Unauthorized;
