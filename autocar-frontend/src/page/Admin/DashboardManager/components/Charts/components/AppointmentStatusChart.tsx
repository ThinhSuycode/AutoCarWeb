import classNames from "classnames/bind";
import styles from "../Charts.module.scss";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChartEmptyState from "./ChartEmptyState";
import type { AppointmentStatusPoint } from "../types/chartTypes";

const cx = classNames.bind(styles);

const AppointmentStatusChart = ({
  data,
}: {
  data: AppointmentStatusPoint[];
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={cx("chart-card")}>
      <div className={cx("chart-header")}>
        <div>
          <h3>Lịch hẹn</h3>
          <p>Phân bổ theo trạng thái</p>
        </div>
      </div>

      {data.length === 0 ? (
        <ChartEmptyState height={200} />
      ) : (
        <>
          <div className={cx("donut-wrap")}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} lịch`, name]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className={cx("donut-center")}>
              <span className={cx("donut-total")}>{total}</span>
              <span className={cx("donut-caption")}>lịch hẹn</span>
            </div>
          </div>

          <div className={cx("pie-legend")}>
            {data.map((item) => (
              <div key={item.name} className={cx("pie-legend-item")}>
                <span
                  className={cx("pie-dot")}
                  style={{ background: item.color }}
                />
                <span className={cx("pie-name")}>{item.label}</span>
                <span className={cx("pie-value")}>{item.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentStatusChart;
