import DashboardUser from "../../../pages/user/DashboardUser";
import ProfileUser from "../../../pages/user/ProfileUser";

const userRoutes = [
  { path: "/dashboardUser", component: <DashboardUser /> },
  { path: "/profileUser", component: <ProfileUser /> },
];

export default userRoutes;
