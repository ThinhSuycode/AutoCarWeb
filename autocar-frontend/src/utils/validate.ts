export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
export const isValidPassword = (password: string): string | null => {
  const p = password.trim();

  if (p.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự!";
  if (!/^[A-Z]/.test(p)) return "Mật khẩu phải bắt đầu bằng chữ hoa!";

  return null; // hợp lệ
};
