import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../../backend/features/user/userApi";

export default function ProfileForm({ user, onClose }) {
  // 1. On récupère la fonction de mutation et l'état 'isLoading'
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  // 2. Implémentation réelle de la soumission
  const onSubmit = async (data) => {
    try {
      // On attend la réponse de la mutation
      await updateUser(data).unwrap();

      // Si ça réussit, on ferme le formulaire
      onClose();
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue lors de la sauvegarde.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-2xl font-black mb-6 text-gray-900">
        Modifier mes informations
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Prénom
            </label>
            <input
              {...register("first_name", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all disabled:bg-gray-50"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nom
            </label>
            <input
              {...register("last_name", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all disabled:bg-gray-50"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all disabled:bg-gray-50"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 text-white py-3 rounded-xl font-bold transition-all ${
              isLoading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-500"
            }`}
          >
            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
