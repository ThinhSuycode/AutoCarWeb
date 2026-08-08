import classNames from "classnames/bind";
import styles from "./ContactAssign.module.scss";
import useContactAssign from "./hooks/useContactAssign";
import ContactStatics from "./components/ContactStatics";
import ContactTable from "./components/ContactTable";
import ContactFilter from "./components/ContactFilter";
import PageHeader from "../../../components/PageHeader/PageHeader";
import FormContactDetail from "../../../components/FormContactDetail/FormContactDetail";

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
    contactDetail,

    staffData,
    setContactDetail,
    onAssignStaffContact,
  } = useContactAssign();

  return (
    <div className={cx("contactAssign-page")}>
      <PageHeader
        title="Quản lý liên hệ"
        description="Phân bổ quản lý liên hệ cho nhân viên"
      ></PageHeader>

      <FormContactDetail
        contact={contactDetail}
        onClose={() => setContactDetail(undefined)}
      ></FormContactDetail>

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
        onShowContact={(data) => setContactDetail(data)}
      />
    </div>
  );
};

export default ContactAssign;
