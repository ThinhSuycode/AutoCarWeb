import { useCurrentUser } from "../../../queries/userQuery/useCurrentUser";

const useFavouriteCar = () => {
  const login = !!localStorage.getItem("token");

  const { data: userData, isLoading } = useCurrentUser(login);

  //   useEffect(() => {
  //     const getMeData = async () => {
  //       const res = await getMeApi();
  //       if (res && res.favouriteCar) {
  //         setFavouriteCar(res.favouriteCar ?? []);
  //       }
  //     };
  //     getMeData();
  //   }, []);
  return {
    userFavouriteCar: userData?.favouriteCar ?? [],
    isLoading,
  };
};

export default useFavouriteCar;
