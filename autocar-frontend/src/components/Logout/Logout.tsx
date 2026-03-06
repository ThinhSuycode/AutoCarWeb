export const onHandleLogout = () => {
  localStorage.setItem("accountActive", JSON.stringify(""));
  window.location.href = "/";
};
