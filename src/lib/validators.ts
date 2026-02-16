export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

export function isPhone(value) {
  return /^\+?[0-9()\-\s]{7,}$/.test(String(value || "").trim());
}

export function isZip(value) {
  return /^\d{5}(-\d{4})?$/.test(String(value || "").trim());
}

export function sanitizeText(value) {
  return String(value || "").replace(/[<>]/g, "");
}

export function isStrongPassword(value) {
  const password = String(value || "");
  return (
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)
  );
}
