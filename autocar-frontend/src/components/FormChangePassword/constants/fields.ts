interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export const fields: {
  label: string;
  name: keyof PasswordForm;
  placeholder: string;
}[] = [
  {
    label: "Mật khẩu hiện tại",
    name: "currentPassword",
    placeholder: "Nhập mật khẩu hiện tại",
  },
  {
    label: "Mật khẩu mới",
    name: "newPassword",
    placeholder: "Nhập mật khẩu mới",
  },
  {
    label: "Xác nhận mật khẩu",
    name: "confirmPassword",
    placeholder: "Nhập lại mật khẩu mới",
  },
];
