import classNames from "classnames/bind";
import style from "./CarInspectionStatus.module.scss";
import type { ManagerCar } from "../../../../../types/user/manager-cars.type";
import {
  CAR_STATUS,
  MANAGER_STATUS,
} from "../../../../../types/car/car.constant";
import { MANAGER_STATUS_MAP } from "../../../../../constants/managerStatus";

const cx = classNames.bind(style);

interface Props {
  car: ManagerCar;
}

const CarInspectionStatus = ({ car }: Props) => {
  const statusCurrent = car.managerStatus;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("list-dotted")}>
        {MANAGER_STATUS.map((item) => (
          <div className={cx("dotted", item === statusCurrent ? item : "")}>
            <i className={`fa-solid ${MANAGER_STATUS_MAP[item].icon}`}></i>
            {MANAGER_STATUS_MAP[item].label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarInspectionStatus;
