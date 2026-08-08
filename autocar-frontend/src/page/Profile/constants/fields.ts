import type { FormInputProfile } from "../../../schemas/user.schema";

export const fields: {
  label: string;
  name: keyof Omit<FormInputProfile, "email">;
  type: React.HTMLInputTypeAttribute;
}[] = [
  {
    label: "Họ và tên",
    name: "username",
    type: "text",
  },
  {
    label: "Số điện thoại",
    name: "phone",
    type: "tel",
  },
  {
    label: "Địa chỉ",
    name: "address",
    type: "text",
  },
];
