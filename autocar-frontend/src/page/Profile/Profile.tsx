import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import { Button } from "../../components/Button/Button";
import FormActive from "../../components/FormActive/FormActive";
import ModalLayout from "../../components/ModalLayout/ModalLayout";

import useProfile from "./hooks/useProfile";
import FormAccount from "./components/FormAccount";

const cx = classNames.bind(styles);

const Profile = () => {
  const {
    account,
    inputProfile,
    loading,
    showForm,
    fields,
    onChangeInputProfile,
    onHandleSaveProfile,
    onHandleShowForm,
    onPasswordChanged,
    setShowForm,
  } = useProfile();

  return (
    <div className={cx("profile-page")}>
      <ModalLayout showForm={showForm} onClose={() => setShowForm(false)}>
        <FormActive
          onClose={() => setShowForm(false)}
          onSuccess={onPasswordChanged}
        />
      </ModalLayout>
      <FormAccount
        account={account}
        inputProfile={inputProfile}
        loading={loading}
        fields={fields}
        onChangeInputProfile={onChangeInputProfile}
        onHandleShowForm={onHandleShowForm}
        onHandleSaveProfile={onHandleSaveProfile}
      />
    </div>
  );
};

export default Profile;
