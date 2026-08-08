import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import { Button } from "../../../components/Button/Button";
import type { FormInputProfile } from "../../../schemas/user.schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { fields } from "../constants/fields";
import type { UserType } from "../../../types/user/user.type";

const cx = classNames.bind(styles);

interface FormAccountProps {
  account: UserType | null;
  register: UseFormRegister<FormInputProfile>;
  errors: FieldErrors<FormInputProfile>;
  isLoading: boolean;
  onHandleShowForm: () => void;
  isSubmitted: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormAccount = ({
  account,
  register,
  errors,
  isLoading,
  onHandleShowForm,
  onSubmit,
  isSubmitted,
}: FormAccountProps) => {
  return (
    <div className={cx("account-wrapper")}>
      <h2>Thông tin cá nhân</h2>

      <form className={cx("form-account")} onSubmit={onSubmit}>
        <div className={cx("account-info")}>
          <div className={cx("form-input")}>
            <label>Email</label>

            <input type="email" value={account?.email ?? ""} disabled />
          </div>

          {fields.map(({ label, name, type }) => (
            <div className={cx("form-input")} key={name}>
              <label>{label}</label>

              <input type={type} {...register(name)} />

              {isSubmitted && errors[name] && (
                <span className={cx("error")}>{errors[name]?.message}</span>
              )}
            </div>
          ))}
        </div>

        <div className={cx("btn-send")}>
          <Button medium type="button" onClick={onHandleShowForm}>
            Đổi mật khẩu
          </Button>

          <button type="submit" disabled={isLoading}>
            <i className="fa-regular fa-floppy-disk" />
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAccount;
