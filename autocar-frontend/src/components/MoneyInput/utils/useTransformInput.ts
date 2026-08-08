export const formatNumber = (value: string | number) => {
  const raw = String(value ?? "").replace(/\D/g, "");
  if (!raw) return "";
  return Number(raw).toLocaleString("vi-VN");
};

export const parseNumber = (value: string) => {
  const raw = value.replace(/\D/g, "");
  return raw ? Number(raw) : 0;
};
