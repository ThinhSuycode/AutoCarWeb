import classNames from "classnames/bind";
import type { ReactNode } from "react";
import styles from "./PageHeader.module.scss";

const cx = classNames.bind(styles);

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className={cx("header")}>
      <div className={cx("header-left")}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      {children && <div className={cx("header-right")}>{children}</div>}
    </div>
  );
};

export default PageHeader;
