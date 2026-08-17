import type { UserType } from "../../../../types/user/user.type";

export type UserAction = "view" | "delete" | "";

export interface GetDataProps {
  userData: UserType | null;
  action: UserAction;
}
