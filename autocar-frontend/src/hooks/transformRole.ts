export const transformRole = (role: string) => {
  if (role === "admin") {
    return "Quản lý";
  } else if (role === "staff") {
    return "Nhân viên cửa hàng";
  } else if (role === "user") {
    return "Khách hàng thân thiết";
  }
  return null;
};
