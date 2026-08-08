import classNames from "classnames/bind";
import styles from "./AssignManager.module.scss";

import { useAssignManager } from "./hooks/useAssignManager";

import StatsBar from "./components/StatsBar/StatsBar";
import CarTable from "./components/CarTable/CarTable";
import { Header } from "./components/Header/Header";
import PagePagination from "../../../components/PagePagination/PagePagination";

const cx = classNames.bind(styles);

const AssignManager = () => {
  const {
    cars,
    staffData,
    isLoading,
    assigningId,

    hasManager,
    setHasManager,

    page,
    onPageChange,

    onManagerChange,

    pagination,
  } = useAssignManager();

  return (
    <div className={cx("assignManager-page")}>
      <Header filter={hasManager} setFilter={setHasManager} />

      <StatsBar cars={cars} staffList={staffData} />

      <CarTable
        cars={cars}
        staffList={staffData}
        assigningId={assigningId}
        onManagerChange={onManagerChange}
        isLoading={isLoading}
      />

      <PagePagination
        currentPage={page}
        onPageChange={onPageChange}
        limit={pagination?.limit ?? 8}
        totalPages={pagination?.totalPages ?? 0}
        total={pagination?.total ?? 0}
      />
    </div>
  );
};

export default AssignManager;
