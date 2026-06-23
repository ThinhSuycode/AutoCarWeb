import { useState } from "react";
import { useContacts } from "../../../queries/useContact";

const useContactHistory = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useContacts({
    status,
    page,
    limit: 8,
  });

  const contacts = data?.data ?? [];
  const pagination = data?.pagination;

  const handleSetStatus = (v: string) => {
    setStatus(v);
    setPage(1);
  };

  return {
    contacts,
    pagination,
    isLoading,
    status,
    setStatus: handleSetStatus,
    page,
    setPage,
  };
};

export default useContactHistory;
