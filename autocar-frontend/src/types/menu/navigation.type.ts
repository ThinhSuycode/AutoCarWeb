import type { LanguageType } from "../common/language.type";

export interface HeaderNavType {
  title: string;

  href: string;
}

export interface SubMenuType {
  title: string;

  children: LanguageType[];
}
