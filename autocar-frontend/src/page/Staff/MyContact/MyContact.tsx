import classNames from "classnames/bind";
import styles from "./MyContact.module.scss";

import useMyContact from "./hooks/useMyContact";

import MyContactStatistics from "./components/MyContactStatistics";
import MyContactFilter from "./components/MyContactFilter";
import MyContactTable from "./components/MyContactTable";
import FormContactDetail from "./components/FormContactDetail";
import useContactDetailQuery from "./queries/useContactDetailQuery";
import { useState } from "react";
import type { Contact } from "../../../types/contact";

const cx = classNames.bind(styles);

const MyContact = () => {
  const {
    contacts,
    stats,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    isLoading,
    updateStatusAsync,
    isUpdating,
    contactDetail,
    setContactDetail,
  } = useMyContact();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2>Khách hàng được giao</h2>
      </div>

      <FormContactDetail
        contact={contactDetail}
        onClose={() => setContactDetail(null)}
      ></FormContactDetail>

      <MyContactStatistics stats={stats} />

      <MyContactFilter
        search={search}
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
        setPage={setPage}
      />

      <MyContactTable
        contacts={contacts}
        isLoading={isLoading}
        isUpdating={isUpdating}
        updateStatus={updateStatusAsync}
        onShowContact={(data) => setContactDetail(data)}
      />
    </div>
  );
};

export default MyContact;
