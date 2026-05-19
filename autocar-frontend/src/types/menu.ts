export type Role = "admin" | "user" | "staff";

export interface HeaderNavType {
  title: string;
  href: string;
}

export interface LanguageType {
  id: string;
  key: string;
  title: string;
  href: string;
}

export interface SubMenuType {
  title: string;
  children: LanguageType[];
}
export interface ManagerItemType {
  id: string;
  title: string;
  icon: string;
  href: string;
  role: string;
}

export interface MenuItemType {
  id?: number;
  icon?: string;
  title: string;
  href?: string;
  hrefByRole?: Partial<Record<Role, string>>;
  adminManager?: ManagerItemType[];
  staffManager?: ManagerItemType[];
  children?: LanguageType[];
  role?: Role | Role[];
  onClick?: () => void;
  onShowChildren?: () => void;
}
