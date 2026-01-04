import DashboardAdmin from "../../../pages/admin/DashboardAdmin";
import ProfileAdmin from "../../../pages/admin/ProfileAdmin";

const adminRoutes = [
  { path: "/admin/dashboard", component: <DashboardAdmin /> },
  { path: "/admin/profile", component: <ProfileAdmin /> },
];
export default adminRoutes;
