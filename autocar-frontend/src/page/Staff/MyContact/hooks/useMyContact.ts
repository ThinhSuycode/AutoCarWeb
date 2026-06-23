import { useState } from "react";

import { useContacts } from "../../../../queries/useContact";
import { useUpdateContactStatus } from "../../../../mutations/useUpdateContactStatus";

import { statistics } from "../utils/myContactStatistics";
import type { Contact } from "../../../../types/contact";

const useMyContact = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [contactDetail, setContactDetail] = useState<Contact | null>(null);

  const { data, isLoading } = useContacts({
    search,
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
