import { useCurrentUser } from "../../../queries/userQuery/useCurrentUser";

const useServices = () => {
  const login = !!localStorage.getItem("token");
  const { data: userInfo } = useCurrentUser(login);
  return {
    userInfo,
  };
};

export default useServices;
