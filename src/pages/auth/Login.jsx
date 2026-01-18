import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../backend/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../backend/features/auth/authSlice";
import toast from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (credentials) => {
    try {
      const res = await loginUser(credentials).unwrap();
      dispatch(setCredentials(res));

      const role = res?.user?.role;

      // console.log("ROLE 👉", res.user.role);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "user") navigate("/user/dashboard");
      else navigate("/unauthorized");
      toast.success("Connexion réussie !");
    } catch (error) {
      console.log("Erreur :", error);
      toast.error(error?.data?.message || "Échec de la connexion");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo ou Titre */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          IBMS-<span className="text-sky-600">Learning</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Heureux de vous revoir ! Connectez-vous à votre espace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md max-sm:px-4 max-sm:py-4">
        <div className="bg-100 py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  {...register("email", { required: true })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="nom@exemple.com"
                />
              </div>
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
                  required
                  {...register("password", { required: true })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={"/forgot-password"}
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            {/* Bouton de validation */}
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>

          {/* Lien vers inscription */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Nouveau sur IBMS ?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Créer un compte étudiant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
