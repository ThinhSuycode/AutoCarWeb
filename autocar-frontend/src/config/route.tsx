export const Routes = {
  Home: "/",
  Profile: "/thong-tin-ca-nhan",
  Favourite: "/xe-yeu-thich",
  AppoinmentHistory: "/thoi-gian-hen",
  ProductSold: "/san-pham",
  About: "/gioi-thieu",
  CarDetails: "/chi-tiet-san-pham/:slug",
  Login: "/dang-nhap",
  Register: "/dang-ky",
  Services: "/dich-vu-cham-soc-xe",
  Articles: "/tin-tuc",
  ArticleSave: "/bai-viet-da-luu",
  NewsDetails: "/chi-tiet-bai-viet/:slug",
  ShowRoom: "/showroom",
  Contact: "/lien-he-showroom",
  //Admin
  Manager: "/admin/quan-ly/:slug",
  AssignManager: "/admin/quan-ly/phan-cong-nhan-vien",
  UsersManager: "/admin/quan-ly/nguoi-dung",
  ArtilcesManager: "/admin/quan-ly/bai-viet",
  CarsManager: "/admin/quan-ly/xe-o-to",
  DashBoardAdmin: "/admin/quan-ly/dasboard",
  //Staff
  CarStaff: "/staff/quan-ly/xe-duoc-phan-cong",
  DashBoardStaff: "/staff/quan-ly/dasboard",
  ArticleStaff: "/staff/quan-ly/bai-viet",
};
export const hiddenFooterRoutes = [
  Routes.Login,
  Routes.Register,
  Routes.CarDetails,
];
