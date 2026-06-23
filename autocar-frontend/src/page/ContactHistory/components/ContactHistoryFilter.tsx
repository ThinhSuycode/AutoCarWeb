import classNames from "classnames/bind";
import styles from "../ContactHistory.module.scss";
import { CONTACT_STATUS_MAP } from "../constant/contactHistoryData";

const cx = classNames.bind(styles);

const TABS: { value: string; label: string }[] = [
  { value: "", label: "Tất cả" },
  ...Object.entries(CONTACT_STATUS_MAP).map(([value, { label }]) => ({
    value,
    label,
  })),
];

interface Props {
  active: string;
  onChange: (v: string) => void;
}

const ContactHistoryFilter = ({ active, onChange }: Props) => (
  <div className={cx("filter-tabs")}>
    {TABS.map((tab) => (
      <button
        key={tab.value}
        type="button"
        className={cx("tab", {
          active: active === tab.value,
          [tab.value || "all"]: true,
        })}
        onClick={() => onChange(tab.value)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default ContactHistoryFilter;
