import type { UserType } from "../../../../types/users";

export type UserAction = "view" | "delete" | "";

export interface GetDataProps {
  userData: UserType | null;
  action: UserAction;
}
