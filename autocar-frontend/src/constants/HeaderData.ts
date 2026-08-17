import { onHandleLogout } from "../components/Logout/Logout";
import { config } from "../config";
import type { MenuItem } from "../types/menu/menu.type";
import type { HeaderNavType } from "../types/menu/navigation.type";

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
export const MenuUserData: MenuItem[] = [
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
        id: "DashBoardAdmin",
        icon: "fa-solid fa-chart-line",
        title: "DoashBoard",
        href: config.Routes.DashBoardAdmin,
        role: "admin",
      },
      {
        id: "AssignManager",
        icon: "fa-solid fa-users-gear",
        title: "Quản lý nhân viên",
        href: config.Routes.AssignManager,
        role: "admin",
      },
      {
        id: "CarsManager",
        icon: "fa-solid fa-car",
        title: "Quản lý xe",
        href: config.Routes.CarsManager,
        role: "admin",
      },
      {
        id: "UsersManager",
        icon: "fa-solid fa-users",
        title: "Quản lý người dùng",
        href: config.Routes.UsersManager,
        role: "admin",
      },
      {
        id: "ArtilcesManager",
        icon: "fa-regular fa-newspaper",
        title: "Quản lý bài viết",
        href: config.Routes.ArtilcesManager,
        role: "admin",
      },
      {
        id: "ContactManager",
        icon: "fa-regular fa-address-book",
        title: "Quản lý liên hệ",
        href: config.Routes.ContactAssign,
        role: "admin",
      },
      {
        id: "AppointmentAdmin",
        icon: "fa-regular fa-calendar-check",
        title: "Lịch hẹn khách hàng",
        href: config.Routes.AppointmentAdmin,
        role: "admin",
      },
    ],
    staffManager: [
      {
        id: "DashBoardStaff",
        icon: "fa-solid fa-chart-line",
        title: "DoashBoard",
        href: config.Routes.DashBoardStaff,
        role: "staff",
      },
      {
        id: "CarStaff",
        icon: "fa-solid fa-car",
        title: "Quản lý xe phân công",
        href: config.Routes.CarStaff,
        role: "staff",
      },
      {
        id: "ArticleStaff",
        icon: "fa-solid fa-file-lines",
        title: "Quản lý bài viết",
        href: config.Routes.ArticleStaff,
        role: "staff",
      },
      {
        id: "MyContact",
        icon: "fa-solid fa-user-check",
        title: "Khách hàng của tôi",
        href: config.Routes.MyContact,
        role: "staff",
      },
      {
        id: "AppointmentManager",
        icon: "fa-regular fa-calendar-check",
        title: "Lịch hẹn khách hàng",
        href: config.Routes.AppointmentStaff,
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
    // href: "/ca-nhan/ngon-ngu",
    children: [
      {
        id: "english",
        title: "Hoa Kỳ",
        href: "",
      },
      {
        id: "vietnamese",
        title: "Việt Nam",
        href: "",
      },
      {
        id: "china",
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
