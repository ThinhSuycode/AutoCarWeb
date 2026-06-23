import { useCallback, useState } from "react";
import { useContacts } from "../../../../queries/useContact";

import { useGetStaffQuery } from "../../../../queries/useGetStaffQuery";
import { useAssignContact } from "../../../../mutations/useAssignContact";
import { statistics } from "../utils/contactStatistics";

const useContactAssign = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useContacts({
    search,
    status,
    page,
    limit: 10,
  });

  const contacts = data?.data ?? [];
  const pagination = data?.pagination;

  const stats = statistics(contacts);

  const { data: staffList } = useGetStaffQuery("staff");
  const staffData = staffList?.data ?? [];

  const { assignContactStaff, isPending } = useAssignContact();

  const onAssignStaffContact = useCallback(
    (id: string, managerId: string) => {
      if (!id) return;

      assignContactStaff({
        id,
        managerId,
      });
    },
    [assignContactStaff],
  );

  return {
    search,
    setSearch,

    status,
    setStatus,

    page,
    setPage,

    contacts,
    pagination,

    stats,

    isLoading,
    isPending,

    staffData,

    onAssignStaffContact,
  };
};

export default useContactAssign;
