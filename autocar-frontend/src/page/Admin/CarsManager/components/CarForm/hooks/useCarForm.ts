import { zodResolver } from "@hookform/resolvers/zod";
import {
  carSchema,
  type CarFormData,
} from "../../../../../../schemas/car.schema";
import type z from "zod";
import { useForm } from "react-hook-form";

type Props = {
  defaultValues?: Partial<CarFormData>;
};

export const useCarForm = ({ defaultValues }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.input<typeof carSchema>, any, z.output<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues,
  });
  return {
    handleSubmit,
    register,
    errors,
  };
};
