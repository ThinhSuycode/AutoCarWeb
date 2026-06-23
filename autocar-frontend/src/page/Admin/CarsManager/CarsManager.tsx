import classNames from "classnames/bind";
import styles from "./CarsManager.module.scss";
import { useCallback, useState } from "react";
import { Button } from "../../../components/Button/Button";
import CarTable from "./components/CarTable";
import ModalLayout from "../../../components/ModalLayout/ModalLayout";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import FormCar from "./components/FormCar";
import FormDetail from "./components/FormDetail";
import type { CarType } from "../../../types/car";
import { useCarDetail } from "./hooks/useFormDetail";
import { useCars } from "./hooks/useForm";
import type { CarFormData } from "../../../schemas/car.schema";
import type { CarManagerType } from "../../../types/managerStaff";
const cx = classNames.bind(styles);

const CarsManager = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  const [openDetail, setOpenDetail] = useState<CarManagerType | null>(null);
  const {
    cars,
    pagination,
    setPage,
    setSearch,
    createCar,
    updateCar,
    creating,
    updating,
  } = useCars();

  const { carDetail, createDetail, updateDetail, detailLoading } = useCarDetail(
    openDetail?._id,
  );

  const onCloseDetail = useCallback(() => {
    setOpenDetail(null);
  }, []);

  return (
    <div className={cx("carsManager-page")}>
      {/* CREATE */}
      {openCreate && (
        <ModalLayout showForm={openCreate} onClose={() => setOpenCreate(false)}>
          <FormCar
            mode="create"
            onCloseModal={() => setOpenCreate(false)}
            creatingPending={creating}
            onSubmit={(data) => {
              createCar(data);
              setOpenCreate(false);
            }}
          />
        </ModalLayout>
      )}

      {/* UPDATE */}
      {selectedCar && (
        <ModalLayout
          showForm={!!selectedCar}
          onClose={() => setSelectedCar(null)}
        >
          <FormCar
            mode="update"
            updatingPending={updating}
            defaultValues={{
              name: selectedCar.name,
              price: selectedCar.price,
              brand: selectedCar.brand,
              year: selectedCar.year,
              mileage: selectedCar.mileage,
              image: selectedCar.image,
              transmission: selectedCar.transmission,
              color: selectedCar.color,
            }}
            onCloseModal={() => setSelectedCar(null)}
            onSubmit={(data: CarFormData) => {
              updateCar({
                id: selectedCar._id,
                data,
              });
              setSelectedCar(null);
            }}
          />
        </ModalLayout>
      )}

      {/* DETAIL */}
      {openDetail && (
        <ModalLayout showForm={!!openDetail} onClose={onCloseDetail}>
          <FormDetail
            onCloseModal={onCloseDetail}
            carDetail={carDetail}
            defaultValues={carDetail ?? undefined}
            isLoading={detailLoading}
            onSubmit={(data) => {
              if (carDetail) {
                updateDetail({
                  id: openDetail._id,
                  data,
                });
              } else {
                createDetail({
                  ...data,
                  carId: openDetail,
                });
              }

              setOpenDetail(null);
            }}
          />
        </ModalLayout>
      )}

      {/* HEADER */}
      <div className={cx("header")}>
        <h2>Quản lý xe</h2>

        <div>
          <Search onSearch={setSearch} />

          <Button small onClick={() => setOpenCreate(true)}>
            <i className="fa-solid fa-plus"></i>
          </Button>
        </div>
      </div>

      {/* <StatsBar cars={cars}></StatsBar> */}
      {/* CONTENT */}
      <div className={cx("content")}>
        <CarTable
          cars={cars}
          carSelected={(data) => setSelectedCar(data)}
          carDetailSelected={(data) => setOpenDetail(data)}
        />
      </div>

      {/* PAGINATION */}
      {pagination && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
};

export default CarsManager;
