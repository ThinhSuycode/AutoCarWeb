import { useCurrentUser } from "../../../queries/userQuery/useCurrentUser";

const useContact = () => {
  const login = !!localStorage.getItem("token");
  const { data: userInfo } = useCurrentUser(login);
  return {
    userInfo,
  };
};

export default useContact;
