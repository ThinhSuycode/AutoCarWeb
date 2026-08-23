import classNames from "classnames/bind";
import styles from "./Statusbreakdownbar.module.scss";
import type { StatusCount } from "../../../../../types/dashboard/dashboard.type";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  subtitle: string;
  data: StatusCount[];
  labelMap: Record<string, string>;
  colorMap: Record<string, string>;
  order: string[];
}

const StatusBreakdownBar = ({
  title,
  subtitle,
  data,
  labelMap,
  colorMap,
  order,
}: Props) => {
  const countMap = Object.fromEntries(data.map((d) => [d._id, d.count]));
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className={cx("chart-card")}>
      <div className={cx("chart-header")}>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      {total === 0 ? (
        <div className={cx("chart-empty")} style={{ height: 140 }}>
          <i className="fa-regular fa-file"></i>
          <span>Chưa có dữ liệu</span>
        </div>
      ) : (
        <div className={cx("breakdown-list")}>
          {order.map((key) => {
            const count = countMap[key] ?? 0;
            const percent = total ? Math.round((count / total) * 100) : 0;

            return (
              <div key={key} className={cx("breakdown-row")}>
                <span className={cx("breakdown-label")}>
                  {labelMap[key] ?? key}
                </span>
                <div className={cx("breakdown-track")}>
                  <div
                    className={cx("breakdown-fill")}
                    style={{
                      width: `${percent}%`,
                      background: colorMap[key] ?? "#94a3b8",
                    }}
                  />
                </div>
                <span className={cx("breakdown-count")}>{count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusBreakdownBar;
