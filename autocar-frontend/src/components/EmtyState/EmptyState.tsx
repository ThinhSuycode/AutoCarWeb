import classNames from "classnames/bind";
import styles from "./EmptyState.module.scss";
import {
  EMPTY_STATE_DATA,
  type EmptyStateType,
} from "./constant/emptyStateData";

const cx = classNames.bind(styles);

interface EmptyStateProps {
  type?: EmptyStateType;
  children?: React.ReactNode;
}

const EmptyState = ({ type = "cars", children }: EmptyStateProps) => {
  const { icon, title } = EMPTY_STATE_DATA[type];

  return (
    <div className={cx("empty-state")}>
      <i className={icon}></i>
      <p>{title}</p>
      {children}
    </div>
  );
};

export default EmptyState;
