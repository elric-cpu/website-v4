import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../src/components/auth/ProtectedRoute";

const mockUseAuth = vi.fn();
vi.mock("@/contexts/SupabaseAuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  it("shows loading state", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });
    render(<ProtectedRoute role="client">ok</ProtectedRoute>);
    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
  });

  it("redirects unauthenticated users to login", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute role="client">
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
          <Route path="/client-portal-login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("redirects to role portal when role mismatch", () => {
    mockUseAuth.mockReturnValue({
      user: { user_metadata: { role: "subcontractor" } },
      loading: false,
    });
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute role="client">
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
          <Route path="/subcontractor-portal" element={<div>Sub Portal</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Sub Portal")).toBeInTheDocument();
  });
});
