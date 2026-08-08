import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Social from "../../components/Social/Social";
import ListProduct from "../../components/ListProduct/ListProduct";
import HomeBanner from "./components/HomeBanner";
import HomeFilter from "./components/HomeFilter";
import HomeWhyChoose from "./components/HomeWhyChoose";
import { useHome } from "./hooks/useHome";

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

  return (
    <div className={cx("home-page")}>
      <Social />

      <HomeBanner carCount={cars.length} bannerStats={bannerStats} />

      <div className={cx("home-products")}>
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

        <HomeWhyChoose />
      </div>
    </div>
  );
};

export default Home;
