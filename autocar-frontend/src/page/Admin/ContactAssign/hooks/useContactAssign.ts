import { useCallback, useState } from "react";
import { useContactsQuery } from "../../../../queries/contactQuery/useContact";
import { useAssignContact } from "../../../../mutations/ContactMutation/useAssignContact";
import { contactStatistics } from "../utils/contactStatistics";
import { useGetRoleQuery } from "../../../../queries/userQuery/useGetRoleQuery";
import type { Contact } from "../../../../types/contact/contact.type";

const useContactAssign = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [contactId, setContactId] = useState("");
  const [contactDetail, setContactDetail] = useState<Contact | undefined>(
    undefined,
  );

  const { data, isLoading } = useContactsQuery({
    search,
    status,
    page,
    limit: 8,
  });

  const contacts = data?.data ?? [];
  const pagination = data?.pagination;

  const stats = contactStatistics(contacts);

  const { data: staffList } = useGetRoleQuery("staff");
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

    setContactDetail,
    contactDetail,
    setContactId,
    contactId,
  };
};

export default useContactAssign;
