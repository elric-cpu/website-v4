import React from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export const coreRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
];
