import classNames from "classnames/bind";
import styles from "./MyContact.module.scss";
import useMyContact from "./hooks/useMyContact";
import MyContactStatistics from "./components/MyContactStatistics";
import MyContactFilter from "./components/MyContactFilter";
import MyContactTable from "./components/MyContactTable/MyContactTable";
import FormContactDetail from "../../../components/FormContactDetail/FormContactDetail";
import PageHeader from "../../../components/PageHeader/PageHeader";

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
    handleClose,
    setContactDetail,
  } = useMyContact();

  return (
    <div className={cx("myContact-page")}>
      <PageHeader
        title="Khách hàng được giao"
        description="Quản lý lịch hẹn của khách hàng AutoViet"
      ></PageHeader>

      <FormContactDetail
        contact={contactDetail}
        onClose={handleClose}
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
