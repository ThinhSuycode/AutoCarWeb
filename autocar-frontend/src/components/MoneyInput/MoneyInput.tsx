import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";

import classNames from "classnames/bind";
import styles from "./MoneyInput.module.scss";
import { formatNumber, parseNumber } from "./utils/useTransformInput";

const cx = classNames.bind(styles);

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  error?: FieldError;
};

const MoneyInput = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  error,
}: Props<T>) => {
  return (
    <div className={cx("wrapper")}>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            className={cx("money-input", {
              error: !!error,
            })}
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            value={formatNumber(field.value)}
            onChange={(e) => field.onChange(parseNumber(e.target.value))}
          />
        )}
      />
      {error && <small className={cx("error")}>{error.message}</small>}
    </div>
  );
};

export default MoneyInput;
