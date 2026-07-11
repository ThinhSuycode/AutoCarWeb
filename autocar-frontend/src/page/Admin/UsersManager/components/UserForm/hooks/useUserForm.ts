import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  createUserSchema,
  type CreateUserInput,
} from "../../../../../../schemas/user.schema";
import { useCreateUser } from "../mutations/useCreateUserMutation";
import { getErrorMessage } from "../../../../../../utils/getErrorMessage";

interface UseUserFormProps {
  onClose: () => void;
}

export const useUserForm = ({ onClose }: UseUserFormProps) => {
  const [passwordShow, setPasswordShow] = useState(false);

  const { createUserMutation, isCreating } = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      password: "",
      address: "",
      phone: "",
      email: "",
      role: "user",
    },
  });

  const onHandleActive = useCallback(() => {
    setPasswordShow((prev) => !prev);
  }, []);

  const onHandleAddUser = useCallback(
    async (formValues: CreateUserInput) => {
      try {
        await createUserMutation(formValues);
        toast.success("Tạo người dùng mới thành công!");
        reset();
        onClose();
      } catch (error: any) {
        toast.error(getErrorMessage(error));
      }
    },
    [createUserMutation, reset, onClose],
  );

  return {
    register,
    handleSubmit: handleSubmit(onHandleAddUser),
    errors,
    passwordShow,
    onHandleActive,
    isCreating,
  };
};
