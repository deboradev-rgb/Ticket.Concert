import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/admin-dashboard-vano",
    Component: AdminDashboard,
  },
]);
