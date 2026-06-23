import classNames from "classnames/bind";
import styles from "../Profile.module.scss";

import { Button } from "../../../components/Button/Button";
import type { UserType } from "../../../types/users";
import type { FieldType, INITIAL_INPUTTYPE } from "../hooks/useProfile";

const cx = classNames.bind(styles);

interface FormAccountProps {
  account: UserType | null;
  inputProfile: INITIAL_INPUTTYPE;
  loading: boolean;
  fields: FieldType[];
  onChangeInputProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleShowForm: () => void;
  onHandleSaveProfile: () => void;
}

const FormAccount = ({
  account,
  inputProfile,
  loading,
  fields,
  onChangeInputProfile,
  onHandleShowForm,
  onHandleSaveProfile,
}: FormAccountProps) => {
  return (
    <div className={cx("account-wrapper")}>
      <h2>Thông tin cá nhân</h2>

      <div className={cx("form-account")}>
        <div className={cx("account-info")}>
          <div className={cx("form-input")}>
            <label>Email</label>

            <input type="email" value={account?.email ?? ""} disabled />
          </div>

          {fields.map(({ label, name, type }) => (
            <div className={cx("form-input")} key={name}>
              <label>{label}</label>

              <input
                type={type}
                name={name}
                value={inputProfile[name]}
                onChange={onChangeInputProfile}
              />
            </div>
          ))}
        </div>

        <div className={cx("btn-send")}>
          <Button medium onClick={onHandleShowForm}>
            Đổi mật khẩu
          </Button>

          <Button
            medium
            onClick={onHandleSaveProfile}
            iconLeft={<i className="fa-regular fa-floppy-disk"></i>}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormAccount;
