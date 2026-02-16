import React from "react";
import { lazyPage } from "@/lib/lazyLoad";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Lazy load portal pages - these are heavy and only needed when user navigates to them
const AuthCallback = lazyPage(() => import("@/pages/AuthCallback"));
const AuthResetPassword = lazyPage(() => import("@/pages/AuthResetPassword"));
const ClientPortal = lazyPage(() => import("@/pages/ClientPortal"));
const ClientPortalLogin = lazyPage(() => import("@/pages/ClientPortalLogin"));
const ClientPortalRegister = lazyPage(
  () => import("@/pages/ClientPortalRegister"),
);
const ClientPortalForgotPassword = lazyPage(
  () => import("@/pages/ClientPortalForgotPassword"),
);
const ClientCompleteProfile = lazyPage(
  () => import("@/pages/ClientCompleteProfile"),
);
const SubcontractorPortal = lazyPage(
  () => import("@/pages/SubcontractorPortal"),
);
const SubcontractorPortalLogin = lazyPage(
  () => import("@/pages/SubcontractorPortalLogin"),
);
const SubcontractorPortalRegister = lazyPage(
  () => import("@/pages/SubcontractorPortalRegister"),
);
const SubcontractorCompleteProfile = lazyPage(
  () => import("@/pages/SubcontractorCompleteProfile"),
);
const StaffPortal = lazyPage(() => import("@/pages/StaffPortal"));
const StaffPortalLogin = lazyPage(() => import("@/pages/StaffPortalLogin"));
const PortalDirectory = lazyPage(() => import("@/pages/PortalDirectory"));

export const portalRoutes = [
  { path: "/portals", element: <PortalDirectory /> },
  { path: "/auth/callback", element: <AuthCallback /> },
  { path: "/auth/reset", element: <AuthResetPassword /> },
  { path: "/client-portal-login", element: <ClientPortalLogin /> },
  {
    path: "/client-portal-forgot-password",
    element: <ClientPortalForgotPassword />,
  },
  { path: "/client-portal-register", element: <ClientPortalRegister /> },
  { path: "/client-complete-profile", element: <ClientCompleteProfile /> },
  {
    path: "/client-portal",
    element: (
      <ProtectedRoute role="client">
        <ClientPortal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/client-portal/*",
    element: (
      <ProtectedRoute role="client">
        <ClientPortal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subcontractor-portal-login",
    element: <SubcontractorPortalLogin />,
  },
  {
    path: "/subcontractor-portal-register",
    element: <SubcontractorPortalRegister />,
  },
  {
    path: "/subcontractor-complete-profile",
    element: <SubcontractorCompleteProfile />,
  },
  {
    path: "/subcontractor-portal",
    element: (
      <ProtectedRoute role="subcontractor">
        <SubcontractorPortal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sub-portal",
    element: (
      <ProtectedRoute role="subcontractor">
        <SubcontractorPortal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sub-portal/*",
    element: (
      <ProtectedRoute role="subcontractor">
        <SubcontractorPortal />
      </ProtectedRoute>
    ),
  },
  { path: "/staff-portal-login", element: <StaffPortalLogin /> },
  {
    path: "/staff-portal",
    element: (
      <ProtectedRoute role="staff">
        <StaffPortal />
      </ProtectedRoute>
    ),
  },
  {
    path: "/staff-portal/*",
    element: (
      <ProtectedRoute role="staff">
        <StaffPortal />
      </ProtectedRoute>
    ),
  },
];
