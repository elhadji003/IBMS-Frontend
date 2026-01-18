import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useConfirmPasswordResetMutation } from "../../backend/features/auth/authApi";
// Assure-toi que cette mutation correspond à PasswordResetConfirmView dans ton authApi

export default function ResetPwd() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmReset, { isLoading }] = useConfirmPasswordResetMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Appel à ton API Django PasswordResetConfirmView
      await confirmReset({
        uidb64: uid,
        token: token,
        new_password: data.newPassword,
        re_new_password: data.confirmPassword,
      }).unwrap();

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de la réinitialisation :", err);
      // Tu peux ajouter un état d'erreur ici pour l'afficher à l'utilisateur
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-black text-gray-900">
          Réinitialisation <span className="text-sky-600">sécurisée</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          Choisissez un nouveau mot de passe robuste pour votre compte.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl border border-gray-100 sm:rounded-3xl sm:px-10">
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Nouveau mot de passe */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    {...register("newPassword", {
                      required: "Le mot de passe est requis",
                      minLength: { value: 8, message: "Minimum 8 caractères" },
                    })}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.newPassword ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm shadow-sm transition-all`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-500 font-bold">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirmation */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Veuillez confirmer le mot de passe",
                      validate: (val) => {
                        if (watch("newPassword") !== val) {
                          return "Les mots de passe ne correspondent pas";
                        }
                      },
                    })}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm shadow-sm transition-all`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 font-bold">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-black text-white bg-sky-600 hover:bg-sky-700 transition-all transform active:scale-95 disabled:bg-gray-400"
              >
                {isLoading ? "Traitement..." : "Mettre à jour le mot de passe"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Succès !</h3>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Votre mot de passe a été modifié avec succès. <br />
                Redirection vers la page de connexion...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
