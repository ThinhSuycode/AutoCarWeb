export const transformImages = (images?: string[]) =>
  images?.filter(Boolean).join("\n") ?? "";

export const parseImages = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
