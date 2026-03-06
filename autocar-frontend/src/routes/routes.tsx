import type React from "react";
import Home from "../page/Home/Home";
import { config } from "../config";

import ProductSold from "../page/ProductSold/ProductSold";
import About from "../page/About/About";
import CarDetails from "../page/CarDetails/CarDetails";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Services from "../page/Services/Services";
import News from "../page/Articles/News";
import NewsDetails from "../page/NewsDetails/NewsDetails";
import ShowRoom from "../page/ShowRoom/ShowRoom";
import MenuCustomer from "../layout/MenuCustomer/MenuCustomer";
import Profile from "../page/Profile/Profile";
import FavouriteCar from "../page/FavouriteCar/FavouriteCar";
import DateRegister from "../page/DateRegister/DateRegister";

export interface RouteItem {
  path: string;
  Component: React.ComponentType;
  Layout?: React.ComponentType<{ children: React.ReactNode }>;
}

const publicRoutes: RouteItem[] = [
  { path: config.Routes.Home, Component: Home },
  { path: config.Routes.Profile, Component: Profile, Layout: MenuCustomer },
  {
    path: config.Routes.Favourite,
    Component: FavouriteCar,
    Layout: MenuCustomer,
  },
  {
    path: config.Routes.DateRegister,
    Component: DateRegister,
    Layout: MenuCustomer,
  },
  { path: config.Routes.ProductSold, Component: ProductSold },
  { path: config.Routes.About, Component: About },
  { path: config.Routes.CarDetails, Component: CarDetails },
  { path: config.Routes.Login, Component: Login },
  { path: config.Routes.Register, Component: Register },
  { path: config.Routes.Services, Component: Services },
  { path: config.Routes.News, Component: News },
  { path: config.Routes.NewsDetails, Component: NewsDetails },
  { path: config.Routes.ShowRoom, Component: ShowRoom },
];

const privateRoutes: RouteItem[] = [
  // { path: "/profile", Component: ProfilePage }
];

export { publicRoutes, privateRoutes };
