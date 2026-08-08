import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../queries/queryKeys";
import { userService } from "../../../../services/user.service";

const useGetStaffQuery = () => {
  return useQuery({
    queryKey: queryKeys.user.staff,
    queryFn: userService.getAllStaff,
  });
};

export default useGetStaffQuery;
