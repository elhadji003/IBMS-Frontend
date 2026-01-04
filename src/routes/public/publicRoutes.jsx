import ForgotPwd from "../../pages/auth/ForgotPwd";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import ResetPwd from "../../pages/auth/ResetPwd";
import Acceuil from "../../pages/home/Acceuil";
import Unauthorized from "../../pages/unauthorized";

const publicRoutes = [
  { path: "/", component: <Acceuil /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/forgot-password", component: <ForgotPwd /> },
  { path: "/reset/:uid/:token", component: <ResetPwd /> },
  { path: "/unauthorized", component: <Unauthorized /> },
];

export default publicRoutes;
