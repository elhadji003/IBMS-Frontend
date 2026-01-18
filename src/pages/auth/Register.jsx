import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ShieldCheck, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../backend/features/auth/authApi";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // On récupère l'état isLoading de la mutation RTK Query
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Supprimer password2 avant l'envoi à l'API si nécessaire
      const { password2, ...registerData } = data;
      await registerUser(registerData).unwrap();
      navigate("/login"); // Redirection après succès
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Rejoindre <span className="text-sky-600">IBMS-Learning</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("first_name", {
                    required: "Le prénom est requis",
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.first_name ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
                  placeholder="Prénom"
                />
              </div>
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("last_name", {
                    required: "Le nom est requis",
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.last_name ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
                  placeholder="Prénom"
                />
              </div>
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "L'email est requis",
                    pattern: { value: /^\S+@\S+$/i, message: "Email invalide" },
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="nom@exemple.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Mot de passe requis",
                    minLength: { value: 6, message: "6 caractères minimum" },
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
                  type="password"
                  {...register("password2", {
                    required: "Veuillez confirmer",
                    validate: (val) =>
                      val === watch("password") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {errors.password2 && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password2.message}
                </p>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Inscription en cours...
                </>
              ) : (
                <span className="flex items-center">
                  Créer mon compte <UserPlus className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà inscrit ?{" "}
              <Link
                to="/login"
                className="font-bold text-sky-600 hover:text-sky-500"
              >
                Connectez-vous ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
