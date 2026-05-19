// Parse giờ để so sánh khoảng cách (VD: "09:30" → 9.5)
export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
