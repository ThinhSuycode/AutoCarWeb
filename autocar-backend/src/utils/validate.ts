export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
export const isValidPassword = (password: string): string | null => {
  const p = password.trim();

  if (p.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự!";
  if (!/^[A-Z]/.test(p)) return "Mật khẩu phải bắt đầu bằng chữ hoa!";

  return null;
};

const phoneRegex = /^(0|\+84)[0-9]{9}$/;
export const validatePhone = (phone: string) => {
  return phoneRegex.test(phone.replace(/\s/g, ""));
};
