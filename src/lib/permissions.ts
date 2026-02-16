const protectedRouteMap = {
  client: ["/client-portal"],
  subcontractor: ["/subcontractor-portal"],
  staff: ["/staff-portal"],
};

export const hasRole = (user: any, role: string) => {
  if (!user || !role) return false;
  return (
    String(user.user_metadata?.role || "").toLowerCase() === role.toLowerCase()
  );
};

export const canAccessRoute = (role: string, path: string) => {
  if (!path) return false;
  if (String(role || "").toLowerCase() === "admin") return true;

  const normalizedRole = String(role || "").toLowerCase();
  const matchedEntry = Object.entries(protectedRouteMap).find(([, prefixes]) =>
    prefixes.some((prefix) => path.startsWith(prefix)),
  );

  if (!matchedEntry) {
    return true;
  }

  return matchedEntry[0] === normalizedRole;
};
