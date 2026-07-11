import { useState } from "react";

import { useContactsQuery } from "../../../../queries/useContact";
import { useUpdateContactStatus } from "../../../../mutations/useUpdateContactStatus";

import { statistics } from "../utils/myContactStatistics";
import type { Contact } from "../../../../types/contact";
import { useDebounce } from "../../../../hooks/useDebounce";

const useMyContact = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [contactDetail, setContactDetail] = useState<Contact | null>(null);

  const { data, isLoading } = useContactsQuery({
    search: useDebounce(search, 450),
    status,
    page,
    limit: 10,
  });

  const contacts = data?.data ?? [];

  const stats = statistics(contacts);

  const { updateStatusAsync, isPending } = useUpdateContactStatus();

  return {
    contacts,
    stats,

    search,
    setSearch,

    status,
    setStatus,

    page,
    setPage,

    isLoading,

    updateStatusAsync,
    isUpdating: isPending,

    setContactDetail,
    contactDetail,
  };
};

export default useMyContact;
