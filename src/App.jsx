import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/Analytics";
import FloatingServiceButton from "@/components/services/FloatingServiceButton";
import { coreRoutes } from "@/routes/routesCore";
import { serviceRoutes } from "@/routes/routesServices";
import { serviceAreaRoutes } from "@/routes/routesServiceAreas";
import { resourceRoutes } from "@/routes/routesResources";
import { blogRoutes } from "@/routes/routesBlog";
import { portalRoutes } from "@/routes/routesPortals";

const appRoutes = [
  ...coreRoutes,
  ...serviceRoutes,
  ...serviceAreaRoutes,
  ...resourceRoutes,
  ...blogRoutes,
  ...portalRoutes,
];

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Analytics />
      <Header key={location.key} />
      <main className="flex-grow">
        <Routes>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
      <FloatingServiceButton />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
