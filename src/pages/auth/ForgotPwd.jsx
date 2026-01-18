import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { useForgotPasswordMutation } from "../../backend/features/auth/authApi";
import { useForm } from "react-hook-form";

export default function ResetPwd() {
  const [userEmail, setUserEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPwd, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data) => {
    try {
      await forgotPwd(data).unwrap();
      setUserEmail(data.email); // ✅ FIX
      setIsSent(true);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const resendEmail = async () => {
    if (!userEmail) return;

    try {
      await forgotPwd({ email: userEmail }).unwrap();
    } catch (error) {
      console.error("Erreur renvoi :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Mot de passe <span className="text-sky-600">oublié ?</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 px-4">
          Entrez votre adresse email et nous vous enverrons un lien de
          réinitialisation.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl border border-gray-100 sm:rounded-3xl sm:px-10">
          {!isSent ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Votre adresse email
                </label>

                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="email"
                    {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide",
                      },
                    })}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
                    placeholder="etudiant@exemple.com"
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-black text-white bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400"
              >
                {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                {!isLoading && <Send className="ml-2 h-4 w-4" />}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-4 text-green-500">
                <CheckCircle2 size={56} />
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Vérifiez vos emails
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Un lien a été envoyé à :
                <br />
                <span className="font-bold text-sky-600">{userEmail}</span>
              </p>

              <button
                onClick={resendEmail}
                className="mt-6 text-sm font-bold text-gray-500 hover:text-sky-600"
              >
                Vous n'avez rien reçu ?{" "}
                <span className="underline">Renvoyer</span>
              </button>
            </div>
          )}

          <div className="mt-8 border-t pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-sky-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
