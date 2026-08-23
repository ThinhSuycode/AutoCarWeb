import type { ZodType } from "zod";
import { AppError } from "./AppError";

const formatZodError = (error: any): string =>
  error.issues.map((i: any) => `${i.path.join(".")}: ${i.message}`).join(" | ");

export const validateWithSchema = <T>(schema: ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new AppError(formatZodError(result.error), 400);
  }

  return result.data;
};
