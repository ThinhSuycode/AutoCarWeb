import classNames from "classnames/bind";
import styles from "./CarsManager.module.scss";
import { useCallback } from "react";
import CarTable from "./components/CarTable/CarTable";
import ModalLayout from "../../../components/ModalLayout/ModalLayout";
import CarForm from "./components/CarForm/CarForm";
import CarHeader from "./components/CarHeader/CarHeader";
import PagePagination from "../../../components/PagePagination/PagePagination";
import useDetailFormMutation from "./components/CarDetailForm/mutations/useDetailFormMutation";
import useCarFormMutation from "./components/CarForm/mutations/useCarFormMutation";
import { useCarsManager } from "./hooks/useCarsManager";
import { type CarDetailFormType } from "../../../schemas/carDetail.schema";
import type { CreateCarDto, UpdateCarDto } from "../../../schemas/car.schema";
import CarDetailForm from "./components/CarDetailForm/CarDetailForm";

const cx = classNames.bind(styles);

const CarsManager = () => {
  const { createCar, updateCar, creating, updating } = useCarFormMutation();

  const {
    cars,
    pagination,
    page,
    setSearch,
    isLoading,
    onPageChange,
    openCreate,
    setOpenCreate,
    selectedCar,
    setSelectedCar,
    openDetail,
    setOpenDetail,
  } = useCarsManager();

  const { carDetail, createDetail, updateDetail, detailLoading } =
    useDetailFormMutation(openDetail?._id ?? "");

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
            onSubmit={(data: CreateCarDto) => {
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
              brand: selectedCar.brand,
              price: selectedCar.price,
              year: selectedCar.year,
              mileage: selectedCar.mileage,
              bodyType: selectedCar.bodyType,
              transmission: selectedCar.transmission,
              color: selectedCar.color,
              fuel: selectedCar.fuel,
              engine: selectedCar.engine,
              seats: selectedCar.seats,
              origin: selectedCar.origin,
              thumbnail: selectedCar.thumbnail,
            }}
            onCloseModal={() => setSelectedCar(null)}
            onSubmit={(data: UpdateCarDto) => {
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
        <ModalLayout showForm={!!openDetail} onClose={() => null}>
          <CarDetailForm
            onCloseModal={onCloseDetail}
            carDetail={carDetail}
            defaultValues={{
              carId: carDetail?.carId._id ?? "",
              location: carDetail?.location ?? "",
              images: carDetail?.images ?? [],
              description: carDetail?.description ?? "",
              features: carDetail?.features ?? [],
              specs: carDetail?.specs ?? [],
            }}
            isLoading={detailLoading}
            onSubmit={(data: CarDetailFormType) => {
              if (carDetail) {
                updateDetail({
                  id: openDetail._id,
                  data,
                });
              } else {
                createDetail({
                  ...data,
                  carId: openDetail._id,
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
          cars={cars ?? []}
          isLoading={isLoading}
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
          onPageChange={onPageChange}
        ></PagePagination>
      )}
    </div>
  );
};

export default CarsManager;
