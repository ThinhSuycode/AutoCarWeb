import { useQuery } from "@tanstack/react-query";
import { contactService } from "../services/contact.service";
import { queryKeys } from "./queryKeys";

interface ContactQueryParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const useContactsQuery = ({
  search = "",
  status = "",
  page = 1,
  limit = 10,
}: ContactQueryParams) => {
  return useQuery({
    queryKey: [...queryKeys.contact.all, search, status, page, limit],

    queryFn: () =>
      contactService.getContactsAll({
        search,
        status,
        page,
        limit,
      }),
    staleTime: 60_000,
  });
};
