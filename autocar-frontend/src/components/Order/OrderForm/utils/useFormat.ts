export const formatPrice = (value: number) =>
  value.toLocaleString("vi-VN") + " VNĐ";

 export const formatDate = (date?: string) => {
    if (!date) return "--";

    return new Date(date).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };