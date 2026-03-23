import { logout } from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { coursApi } from "./features/formation/coursApi"; // Importe ton API de cours
import { persistor } from "./app/store";

export const resetApp = () => async (dispatch) => {
  // 1. VIDE LE CACHE DES DEUX APIS (C'est ça qui enlève les cours de l'User 1)
  dispatch(authApi.util.resetApiState());
  dispatch(coursApi.util.resetApiState()); 

  // 2. Vide le state de l'utilisateur (le slice auth)
  dispatch(logout());

  // 3. Purge Redux-Persist (le stockage physique)
  await persistor.purge();

  // 4. Nettoyage radical du localStorage
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  // localStorage.clear(); // Optionnel : nettoie absolument tout
};