import { useState } from "react";
import { useContactsQuery } from "../../../queries/contactQuery/useContact";

const useContactHistory = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useContactsQuery({
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
