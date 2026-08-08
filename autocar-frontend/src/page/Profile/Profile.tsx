import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import ModalLayout from "../../components/ModalLayout/ModalLayout";
import useProfile from "./hooks/useProfile";
import FormAccount from "./components/FormAccount";
import FormChangePassword from "../../components/FormChangePassword/FormChangePassword";

const cx = classNames.bind(styles);

const Profile = () => {
  const {
    account,
    register,
    handleSubmit,
    errors,
    isLoading,
    showForm,
    handleSaveProfile,
    onHandleShowForm,
    onPasswordChanged,
    setShowForm,
    isSubmitted,
  } = useProfile();

  return (
    <div className={cx("profile-page")}>
      <ModalLayout showForm={showForm} onClose={() => setShowForm(false)}>
        <FormChangePassword
          onClose={() => setShowForm(false)}
          onSuccess={onPasswordChanged}
        />
      </ModalLayout>

      <FormAccount
        account={account ?? null}
        isSubmitted={isSubmitted}
        register={register}
        errors={errors}
        isLoading={isLoading}
        onHandleShowForm={onHandleShowForm}
        onSubmit={handleSubmit(handleSaveProfile)}
      />
    </div>
  );
};

export default Profile;
