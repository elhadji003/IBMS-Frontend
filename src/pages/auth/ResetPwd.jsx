import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ResetPwd() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    // Ici, appel API pour mettre à jour le mot de passe
    console.log("Nouveau mot de passe défini");
    setIsSuccess(true);

    // Redirection automatique après 3 secondes vers le login
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Réinitialisation <span className="text-sky-600">sécurisée</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choisissez un nouveau mot de passe robuste pour votre compte.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Nouveau mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="newPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirmation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all"
              >
                Mettre à jour le mot de passe{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Succès !</h3>
              <p className="text-sm text-gray-600 mt-2">
                Votre mot de passe a été modifié avec succès. Redirection vers
                la page de connexion...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
