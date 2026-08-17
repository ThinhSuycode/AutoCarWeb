import type { LanguageType } from "../common/language.type";
import type { Role } from "../common/role.type";
import type { ManagerMenuItem } from "./manager-menu.type";

export interface MenuItemType {
  id?: number;

  title: string;

  href?: string;

  icon?: string;

  hrefByRole?: Partial<Record<Role, string>>;

  adminManager?: ManagerMenuItem[];

  staffManager?: ManagerMenuItem[];

  children?: LanguageType[];

  role?: Role | Role[];

  onClick?: () => void;

  onShowChildren?: () => void;
}
