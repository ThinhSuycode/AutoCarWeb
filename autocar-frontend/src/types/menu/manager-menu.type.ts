import type { Role } from "../common/role.type";

export interface ManagerMenuItem {
  id: string;

  title: string;

  icon: string;

  href: string;

  role: Role;
}
