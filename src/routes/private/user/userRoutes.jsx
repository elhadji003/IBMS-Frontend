import Cours from "../../../pages/partenaire/free/Cours";
import CourseDetail from "../../../pages/partenaire/payant/CoursDetailsPyt";
import CoursPremium from "../../../pages/partenaire/payant/CoursPremium";
import DashboardUser from "../../../pages/user/DashboardUser";
import MaCertification from "../../../pages/user/MaCertification";
import MesCours from "../../../pages/user/MesCours";
import ProfileUser from "../../../pages/user/ProfileUser";

const userRoutes = [
  { path: "/user/dashboard/", component: <DashboardUser /> },
  { path: "/user/profile", component: <ProfileUser /> },
  { path: "/user/courses", component: <MesCours /> },
  { path: "/user/certification", component: <MaCertification /> },
  { path: "/user/cours/gratuits/", component: <Cours /> },
  { path: "/user/cours/payants/", component: <CoursPremium /> },
  { path: "/user/cours/:id/", component: <CourseDetail /> },
];

export default userRoutes;
