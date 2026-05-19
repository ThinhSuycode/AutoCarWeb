import classNames from "classnames/bind";
import styles from "./ConfirmDialog.module.scss";

const cx = classNames.bind(styles);

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  isOpen,
  title = "Xác nhận",
  message,
  confirmText = "Xác nhận",
  cancelText = "Huỷ",
  onConfirm,
  onCancel,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className={cx("overlay")} onClick={onCancel}>
      <div className={cx("dialog")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("icon")}>
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h4 className={cx("title")}>{title}</h4>
        <p className={cx("message")}>{message}</p>
        <div className={cx("actions")}>
          <button className={cx("btn-cancel")} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={cx("btn-confirm")} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
