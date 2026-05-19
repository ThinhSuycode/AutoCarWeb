import classNames from "classnames/bind";
import styles from "./CarsManager.module.scss";
import { Button } from "../../../components/Button/Button";
import { useCallback, useState } from "react";
import CarTable from "./components/CarTable";
import ModalLayout from "../../../components/ModalLayout/ModalLayout";
import { useCarsManager } from "./hooks/useCarsManager";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import FormCar from "./components/FormCar";
import type { CarDetailsType } from "../../../types/car";
import FormDetail from "./components/FormDetail";

const cx = classNames.bind(styles);

interface ModalFormType {
  status: boolean;
  title: "formcar" | "formdetail" | "";
}
const CarsManager = () => {
  const { onPageChange, cars, pagination, setSearch } = useCarsManager();
  const [showModal, setShowModal] = useState<ModalFormType>({
    status: false,
    title: "",
  });
  const [carDetail, setCarDetail] = useState<CarDetailsType | null>(null);
  const onCloseModal = useCallback(() => {
    setShowModal({
      status: false,
      title: "",
    });
  }, []);

  return (
    <div className={cx("carsManager-page")}>
      <ModalLayout showForm={showModal.status} onClose={onCloseModal}>
        {showModal.title === "formcar" && (
          <FormCar onClose={onCloseModal} onPageChange={onPageChange}></FormCar>
        )}
        {showModal.title === "formdetail" && (
          <FormDetail carDetail={carDetail} onClose={onCloseModal}></FormDetail>
        )}
      </ModalLayout>
      <div className={cx("header")}>
        <h2>Quản lý xe</h2>
        <div>
          <Search onSearch={setSearch}></Search>
          <Button
            small
            onClick={() =>
              setShowModal({
                status: true,
                title: "formcar",
              })
            }
          >
            <i className="fa-solid fa-plus"></i>
          </Button>
        </div>
      </div>
      <div className={cx("content")}>
        <CarTable
          cars={cars}
          getDataDetail={(data) => {
            setCarDetail(data);
            setShowModal({ status: true, title: "formdetail" });
          }}
        ></CarTable>
      </div>
      <Pagination
        pagination={pagination}
        onPageChange={onPageChange}
      ></Pagination>
    </div>
  );
};

export default CarsManager;
