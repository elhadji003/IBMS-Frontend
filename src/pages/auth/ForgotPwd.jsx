import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export default function ResetPwd() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi d'email ici
    console.log("Demande de reset pour :", email);
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Mot de passe <span className="text-sky-600">oublié ?</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 px-4">
          Pas d'inquiétude, entrez votre adresse email et nous vous enverrons un
          lien pour réinitialiser votre accès.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          {!isSent ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Votre adresse email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="etudiant@exemple.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all"
              >
                Envoyer le lien <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4 text-green-500">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Vérifiez vos emails
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Un lien de récupération a été envoyé à <br />
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-6 text-sm text-sky-600 hover:underline"
              >
                Renvoyer l'email
              </button>
            </div>
          )}

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-sky-600 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
