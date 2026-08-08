import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../queries/queryKeys";
import { contactService } from "../../../../services/contact.service";
import type { Contact } from "../../../../types/contact/contact.type";

const useContactDetailQuery = (id: string) => {
  return useQuery<Contact>({
    queryKey: queryKeys.contact.detail(id),
    queryFn: () => contactService.getContactById(id),
    enabled: !!id,
  });
};

export default useContactDetailQuery;
