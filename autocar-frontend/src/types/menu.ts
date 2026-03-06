export interface HeaderNavType {
  title: string;
  href: string;
}
export interface MenuCustomerType {
  id: string;
  icon: string;
  title: string;
  href?: string;
  children?: LanguageType[];
  onClick?: () => void;
}
export interface LanguageType {
  key: string;
  title: string;
  href: string;
}
export interface SubMenuType {
  title: string;
  children: LanguageType[];
}
