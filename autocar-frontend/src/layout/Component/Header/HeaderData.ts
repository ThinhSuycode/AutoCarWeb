import { onHandleLogout } from "../../../components/Logout/Logout";
import { config } from "../../../config";

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
export const dataHeaderNav: HeaderNavType[] = [
  {
    title: "TRANG CHỦ",
    href: config.Routes.Home,
  },
  {
    title: "XE ĐANG BÁN",
    href: config.Routes.ProductSold,
  },
  {
    title: "DỊCH VỤ",
    href: config.Routes.Services,
  },
  {
    title: "VỀ CHÚNG TÔI",
    href: config.Routes.About,
  },
  {
    title: "TIN TỨC",
    href: config.Routes.News,
  },
];
export const MenuCustomerData: MenuCustomerType[] = [
  {
    id: "1",
    icon: "fa-regular fa-address-card",
    title: "Thông tin cá nhân",
    href: "/ca-nhan/thong-tin",
  },
  {
    id: "2",
    icon: "fa-regular fa-heart",
    title: "Xe yêu thích",
    href: "/ca-nhan/xe-yeu-thich",
  },
  {
    id: "3",
    icon: "fa-regular fa-calendar",
    title: "Lịch hẹn",
    href: "/ca-nhan/thoi-gian-hen",
  },
  {
    id: "4",
    icon: "fa-solid fa-language",
    title: "Ngôn ngữ",
    href: "/ca-nhan/ngon-ngu",
    // onClick:
    children: [
      {
        key: "english",
        title: "Hoa Kỳ",
        href: "",
      },
      {
        key: "vietnamese",
        title: "Việt Nam",
        href: "",
      },
      {
        key: "china",
        title: "Trung Quốc",
        href: "",
      },
    ],
  },
  {
    id: "5",
    icon: "fa-solid fa-arrow-right-from-bracket",
    title: "Đăng xuất",
    href: config.Routes.Home,
    onClick: onHandleLogout,
  },
];
