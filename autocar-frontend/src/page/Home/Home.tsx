import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Social from "../../components/Social/Social";
import ListProduct from "../../components/ListProduct/ListProduct";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import HomeFilter from "./components/HomeFilter/HomeFilter";
import HomeAbout from "./components/HomeAbout/HomeAbout";
import HomeWhyChoose from "./components/HomeWhyChoose/HomeWhyChoose";
import { useHome } from "./hooks/useHome";
import NavigationComponent from "./components/NavigationComponent/NavigationComponent";

const cx = classNames.bind(styles);

const Home = () => {
  const {
    cars,
    filter,
    openFilter,
    bannerStats,
    onFilterChange,
    toggleFilter,
  } = useHome();

  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [location]);

  return (
    <div className={cx("home-page")}>
      <NavigationComponent />

      <Social />

      <div id="home-banner">
        <HomeBanner carCount={cars.length} bannerStats={bannerStats} />
      </div>

      <div id="home-about">
        <HomeAbout />
      </div>

      <div id="home-products" className={cx("home-products")}>
        <HomeFilter
          openFilter={openFilter}
          filter={filter}
          onFilterChange={onFilterChange}
          onToggle={toggleFilter}
        />

        <ListProduct
          heading="Xe đang bán"
          carShow
          productData={cars.slice(0, 6)}
          desc={`${cars.length} sản phẩm`}
        />
      </div>

      <div id="home-why-choose">
        <HomeWhyChoose />
      </div>
    </div>
  );
};

export default Home;
