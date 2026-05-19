import type React from "react";
import Home from "../page/Home/Home";
import { config } from "../config";

import ProductSold from "../page/ProductSold/ProductSold";
import About from "../page/About/About";
import CarDetails from "../page/CarDetails/CarDetails";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Services from "../page/Services/Services";
import NewsDetails from "../page/ArticleDetails/ArticleDetails";
import ShowRoom from "../page/ShowRoom/ShowRoom";
import MenuCustomer from "../layout/MenuUser/MenuUser";
import Profile from "../page/Profile/Profile";
import FavouriteCar from "../page/FavouriteCar/FavouriteCar";
import AppointmentHistory from "../page/AppointmentHistory/AppointmentHistory";
import Article from "../page/Articles/Articles";
import Contact from "../page/Contact/Contact";
import AssignManager from "../page/Admin/AssignManager/AssignManager";
import CarsManager from "../page/Admin/CarsManager/CarsManager";
import UsersManager from "../page/Admin/UsersManager/UsersManager";
import ArticleSave from "../page/ArticleSave/ArticleSave";
import ArticleManager from "../page/Staff/ArticleManager/ArticleManager";
import CarManager from "../page/Staff/CarManager/CarManager";
import DashboardManager from "../page/Admin/DashboardManager/DashboardManager";

export interface RouteItem {
  path: string;
  Component: React.ComponentType;
  Layout?: React.ComponentType<{ children: React.ReactNode }>;
  requiredRole?: "admin" | "user" | "staff";
}

const publicRoutes: RouteItem[] = [
  { path: config.Routes.Home, Component: Home },
  { path: config.Routes.ProductSold, Component: ProductSold },
  { path: config.Routes.About, Component: About },
  { path: config.Routes.CarDetails, Component: CarDetails },
  { path: config.Routes.Login, Component: Login },
  { path: config.Routes.Register, Component: Register },
  { path: config.Routes.Services, Component: Services },
  { path: config.Routes.Articles, Component: Article },
  { path: config.Routes.NewsDetails, Component: NewsDetails },
  { path: config.Routes.ShowRoom, Component: ShowRoom },
  { path: config.Routes.Contact, Component: Contact },
];

const privateRoutes: RouteItem[] = [
  { path: config.Routes.Profile, Component: Profile, Layout: MenuCustomer },
  {
    path: config.Routes.Favourite,
    Component: FavouriteCar,
    Layout: MenuCustomer,
  },
  {
    path: config.Routes.AppoinmentHistory,
    Component: AppointmentHistory,
    Layout: MenuCustomer,
  },
  {
    path: config.Routes.ArticleSave,
    Component: ArticleSave,
    Layout: MenuCustomer,
  },

  // Phải đăng nhập + role admin
  {
    path: config.Routes.AssignManager,
    Component: AssignManager,
    Layout: MenuCustomer,
    requiredRole: "admin",
  },
  {
    path: config.Routes.CarsManager,
    Component: CarsManager,
    Layout: MenuCustomer,
    requiredRole: "admin",
  },
  {
    path: config.Routes.UsersManager,
    Component: UsersManager,
    Layout: MenuCustomer,
    requiredRole: "admin",
  },
  {
    path: config.Routes.DashBoardAdmin,
    Component: DashboardManager,
    Layout: MenuCustomer,
    requiredRole: "admin",
  },
  // Phải đăng nhập + role staff
  {
    path: config.Routes.ArticleStaff,
    Component: ArticleManager,
    Layout: MenuCustomer,
    requiredRole: "staff",
  },
  {
    path: config.Routes.CarStaff,
    Component: CarManager,
    Layout: MenuCustomer,
    requiredRole: "staff",
  },
  {
    path: config.Routes.DashBoardStaff,
    Component: UsersManager,
    Layout: MenuCustomer,
    requiredRole: "staff",
  },
];

export { publicRoutes, privateRoutes };
