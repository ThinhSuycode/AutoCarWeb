import classNames from "classnames/bind";
import styles from "./TodoCard.module.scss";

const cx = classNames.bind(styles);

interface Props {
  icon: React.ElementType;
  title: string;
  count: number;
  emptyText: string;
  children: React.ReactNode;
  accent: "red" | "blue" | "amber";
}

const TodoCard = ({
  icon: Icon,
  title,
  count,
  emptyText,
  children,
  accent,
}: Props) => (
  <div className={cx("todo-card")}>
    <div className={cx("todo-header")}>
      <div className={cx("todo-icon", accent)}>
        <Icon size={16} />
      </div>
      <h4>{title}</h4>
      {count > 0 && <span className={cx("todo-count", accent)}>{count}</span>}
    </div>

    {count === 0 ? (
      <p className={cx("todo-empty")}>{emptyText}</p>
    ) : (
      <div className={cx("todo-list")}>{children}</div>
    )}
  </div>
);

export default TodoCard;
