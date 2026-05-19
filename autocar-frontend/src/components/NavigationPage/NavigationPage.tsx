import classNames from "classnames/bind";
import styles from "./NavigationPage.module.scss";
import { config } from "../../config";

const cx = classNames.bind(styles);

const NavigationPage = ({
  pageActive,
  title,
}: {
  pageActive: string;
  title: string;
}) => {
  return (
    <div className={cx("navigation-inner")}>
      <a href={config.Routes.Home}>
        <div>
          <span>
            <i className="fa-regular fa-house"></i>
          </span>
          <span>Trang chủ</span>
        </div>
        <div>
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </a>
      {pageActive === "Xe đang bán" ? (
        <a href={config.Routes.ProductSold}>
          <div>
            <span>{pageActive}</span>
          </div>
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </a>
      ) : (
        <a href={config.Routes.Articles}>
          <div>
            <span>{pageActive}</span>
          </div>
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </a>
      )}
      <a>
        <div>
          <span>{title}</span>
        </div>
      </a>
    </div>
  );
};

export default NavigationPage;
