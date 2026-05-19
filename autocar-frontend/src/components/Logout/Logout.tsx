export const onHandleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
