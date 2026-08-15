import classNames from "classnames/bind";
import styles from "./ModalLayout.module.scss";
import type React from "react";

const cx = classNames.bind(styles);
const ModalLayout = ({
  children,
  showForm,
  onClose,
  classNames,
}: {
  children: React.ReactNode;
  showForm: boolean;
  onClose?: () => void;
  classNames?: string;
}) => {
  return (
    <div
      className={cx("modal-layout", { activeModal: showForm })}
      onClick={onClose}
    >
      <div
        className={cx("form", classNames)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
