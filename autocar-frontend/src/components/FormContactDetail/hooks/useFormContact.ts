import { useEffect, useState } from "react";
import { getMeApi } from "../../../services/auth.service";
import type { ContactDetailView } from "../../../page/Staff/MyContact/utils/myContactStatistics";
import type { UserType } from "../../../types/user/user.type";

const useFormContact = () => {
  const [viewMode, setViewMode] = useState<ContactDetailView>("detail");

  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const getDataUser = async () => {
      const res = await getMeApi();
      setUserData(res);
    };

    getDataUser();
  }, []);

  return {
    viewMode,
    setViewMode,
    userData,
  };
};

export default useFormContact;
