import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Dashboard from "./pages/Dashboard";
import DiscoveryLab from "./pages/DiscoveryLab";
import EvolutionLab from "./pages/EvolutionLab";
import AutonomousLab from "./pages/AutonomousLab";
import ProsControl from "./pages/ProsControl";
import RunsPage from "./pages/RunsPage";
import MemoryLab from "./pages/MemoryLab";
import ModulesPage from "./pages/ModulesPage";
import SettingsPage from "./pages/SettingsPage";
// SaaS Pages
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import SaaSDashboard from "./pages/SaaSDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter([
  // SaaS Routes (no layout wrapper)
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: <SaaSDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  // Legacy Routes (with layout wrapper)
  {
    path: "/legacy/dashboard",
    element: <PageLayout title="Dashboard"><Dashboard /></PageLayout>,
  },
  {
    path: "/discovery",
    element: <PageLayout title="Discovery Lab"><DiscoveryLab /></PageLayout>,
  },
  {
    path: "/evolution",
    element: <PageLayout title="Evolution Lab"><EvolutionLab /></PageLayout>,
  },
  {
    path: "/autonomous",
    element: <PageLayout title="Autonomous Lab"><AutonomousLab /></PageLayout>,
  },
  {
    path: "/pros",
    element: <PageLayout title="Pros Control"><ProsControl /></PageLayout>,
  },
  {
    path: "/runs",
    element: <PageLayout title="Runs & Reports"><RunsPage /></PageLayout>,
  },
  {
    path: "/memory",
    element: <PageLayout title="Memory Explorer"><MemoryLab /></PageLayout>,
  },
  {
    path: "/modules",
    element: <PageLayout title="Modules"><ModulesPage /></PageLayout>,
  },
  {
    path: "/settings",
    element: <PageLayout title="Settings"><SettingsPage /></PageLayout>,
  },
]);

export default router;
