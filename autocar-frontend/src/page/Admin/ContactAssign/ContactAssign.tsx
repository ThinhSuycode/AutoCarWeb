import classNames from "classnames/bind";
import styles from "./ContactAssign.module.scss";
import useContactAssign from "./hooks/useContactAssign";
import ContactStatics from "./components/ContactStatics";
import ContactTable from "./components/ContactTable";
import ContactFilter from "./components/ContactFilter";

const cx = classNames.bind(styles);

const ContactAssign = () => {
  const {
    search,
    setSearch,

    status,
    setStatus,

    setPage,

    contacts,

    stats,

    isLoading,
    isPending,

    staffData,

    onAssignStaffContact,
  } = useContactAssign();

  return (
    <div className={cx("wrapper")}>
      {/* Header */}
      <div className={cx("header")}>
        <h2>Quản lý yêu cầu liên hệ</h2>
      </div>

      {/* Statistics */}
      <ContactStatics stats={stats}></ContactStatics>
      <ContactFilter
        search={search}
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
        setPage={setPage}
      />
      <ContactTable
        contacts={contacts}
        isLoading={isLoading}
        isPending={isPending}
        staffData={staffData}
        onAssignStaffContact={onAssignStaffContact}
      />
    </div>
  );
};

export default ContactAssign;
