export const generateDateOptions = () =>
  Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  });

export const generateTimeOptions = () => {
  const slots: { value: string; label: string }[] = [];
  for (let h = 8; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) break;
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const period = h < 12 ? "AM" : "PM";
      const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      slots.push({ value: `${hh}:${mm}`, label: `${h12}:${mm} ${period}` });
    }
  }
  return slots;
};
