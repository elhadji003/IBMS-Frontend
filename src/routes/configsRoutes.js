import { Layout } from "lucide-react";
import publicRoutes from "./public/publicRoutes";
import LayoutUser from "../Layouts/LayoutUser";
import userRoutes from "./private/user/userRoutes";
import adminRoutes from "./private/admin/adminRoutes";

const configsRoutes = [  
    {
        role: "public",
        Layout: null,
        routes: publicRoutes,
    },
    {
        role: "admin",
        Layout: LayoutUser,
        routes: adminRoutes,
    },
    {
        role: "user",
        Layout: LayoutUser,
        routes: userRoutes,
    }

]

export default configsRoutes;