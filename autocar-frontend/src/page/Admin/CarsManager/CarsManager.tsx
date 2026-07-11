import classNames from "classnames/bind";
import styles from "./CarsManager.module.scss";
import { useCallback, useState } from "react";
import CarTable from "./components/CarTable/CarTable";
import ModalLayout from "../../../components/ModalLayout/ModalLayout";
import type { CarType } from "../../../types/car";
import type { CarFormData } from "../../../schemas/car.schema";
import type { CarManagerType } from "../../../types/managerStaff";
import CarForm from "./components/CarForm/CarForm";
import CarDetailForm from "./components/CarDetailForm/CarDetailForm";
import CarHeader from "./components/CarHeader/CarHeader";
import PagePagination from "../../../components/PagePagination/PagePagination";
import useDetailFormMutation from "./components/CarDetailForm/mutations/useDetailFormMutation";
import useCarFormMutation from "./components/CarForm/mutations/useCarFormMutation";

const cx = classNames.bind(styles);

const CarsManager = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  const [openDetail, setOpenDetail] = useState<CarManagerType | null>(null);
  const {
    cars,
    pagination,
    page,
    setPage,
    setSearch,
    createCar,
    updateCar,
    creating,
    updating,
  } = useCarFormMutation();

  const { carDetail, createDetail, updateDetail, detailLoading } =
    useDetailFormMutation(openDetail?._id);

  const onCloseDetail = useCallback(() => {
    setOpenDetail(null);
  }, []);

  return (
    <div className={cx("carsManager-page")}>
      {openCreate && (
        <ModalLayout showForm={openCreate} onClose={() => setOpenCreate(false)}>
          <CarForm
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

      {selectedCar && (
        <ModalLayout
          showForm={!!selectedCar}
          onClose={() => setSelectedCar(null)}
        >
          <CarForm
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

      {openDetail && (
        <ModalLayout showForm={!!openDetail} onClose={onCloseDetail}>
          <CarDetailForm
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

      <CarHeader
        setSearch={setSearch}
        setOpenCreate={setOpenCreate}
      ></CarHeader>

      <div className={cx("content")}>
        <CarTable
          cars={cars}
          carSelected={(data) => setSelectedCar(data)}
          carDetailSelected={(data) => setOpenDetail(data)}
        />
      </div>

      {pagination && (
        <PagePagination
          currentPage={page}
          total={pagination.total}
          limit={pagination.limit}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        ></PagePagination>
      )}
    </div>
  );
};

export default CarsManager;
