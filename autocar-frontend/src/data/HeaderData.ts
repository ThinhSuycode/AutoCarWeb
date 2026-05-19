import { onHandleLogout } from "../components/Logout/Logout";
import { config } from "../config";
import type { HeaderNavType, MenuItemType } from "../types/menu";

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
    href: config.Routes.Articles,
  },
];
export const MenuUserData: MenuItemType[] = [
  {
    icon: "fa-regular fa-address-card",
    title: "Thông tin cá nhân",
    href: config.Routes.Profile,
  },
  {
    icon: "fa-regular fa-heart",
    title: "Xe yêu thích",
    href: config.Routes.Favourite,
    role: "user",
  },
  {
    icon: "fa-regular fa-calendar",
    title: "Lịch hẹn",
    href: config.Routes.AppoinmentHistory,
    role: "user",
  },

  {
    icon: "fa-brands fa-buffer",
    title: "Quản lý",
    role: ["admin", "staff"],
    hrefByRole: {
      admin: config.Routes.DashBoardAdmin,
      staff: config.Routes.DashBoardStaff,
    },
    adminManager: [
      {
        id: "1",
        icon: "fa-solid fa-chart-line",
        title: "DoashBoard",
        href: config.Routes.DashBoardAdmin,
        role: "admin",
      },
      {
        id: "2",
        icon: "fa-solid fa-users-gear",
        title: "Quản lý nhân viên",
        href: config.Routes.AssignManager,
        role: "admin",
      },
      {
        id: "3",
        icon: "fa-solid fa-car",
        title: "Quản lý xe",
        href: config.Routes.CarsManager,
        role: "admin",
      },
      {
        id: "4",
        icon: "fa-solid fa-users",
        title: "Quản lý người dùng",
        href: config.Routes.UsersManager,
        role: "admin",
      },
      {
        id: "5",
        icon: "fa-regular fa-newspaper",
        title: "Quản lý bài viết",
        href: config.Routes.UsersManager,
        role: "admin",
      },
    ],
    staffManager: [
      {
        id: "1",
        icon: "fa-solid fa-chart-line",
        title: "DoashBoard",
        href: config.Routes.DashBoardStaff,
        role: "staff",
      },
      {
        id: "2",
        icon: "fa-solid fa-car",
        title: "Quản lý xe phân công",
        href: config.Routes.CarStaff,
        role: "staff",
      },
      {
        id: "3",
        icon: "fa-solid fa-users",
        title: "Quản lý bài viết",
        href: config.Routes.ArticleStaff,
        role: "staff",
      },
      {
        id: "4",
        icon: "fa-regular fa-newspaper",
        title: "Lịch hẹn khách hàng",
        href: config.Routes.UsersManager,
        role: "staff",
      },
    ],
  },
  {
    icon: "fa-regular fa-newspaper",
    title: "Bài viết đã lưu",
    href: config.Routes.ArticleSave,
    role: "user",
  },

  {
    icon: "fa-solid fa-language",
    title: "Ngôn ngữ",
    href: "/ca-nhan/ngon-ngu",
    children: [
      {
        id: "1",
        key: "english",
        title: "Hoa Kỳ",
        href: "",
      },
      {
        id: "2",
        key: "vietnamese",
        title: "Việt Nam",
        href: "",
      },
      {
        id: "3",
        key: "china",
        title: "Trung Quốc",
        href: "",
      },
    ],
  },
  {
    icon: "fa-solid fa-arrow-right-from-bracket",
    title: "Đăng xuất",
    href: config.Routes.Home,
    onClick: onHandleLogout,
  },
];
