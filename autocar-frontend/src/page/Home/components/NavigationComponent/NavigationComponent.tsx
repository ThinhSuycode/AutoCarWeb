import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NavigationComponent.module.scss";

const cx = classNames.bind(styles);

// "path" là route thật (react-router), "hash" là id của section cần cuộn tới trong route đó.
// Nếu sau này "Sản phẩm" / "Liên hệ" tách thành trang riêng (VD: /cars, /contact),
// chỉ cần đổi path tương ứng — Link sẽ tự chuyển route đúng chuẩn SPA, không reload trang.
const NAV_ITEMS = [
  { path: "/", hash: "home-banner", label: "Trang chủ" },
  { path: "/", hash: "home-about", label: "Giới thiệu" },
  { path: "/", hash: "home-products", label: "Sản phẩm" },
  { path: "/", hash: "home-why-choose", label: "Vì sao chọn chúng tôi" },
  // { path: "/", hash: "home-contact", label: "Liên hệ" },
];

const NavigationComponent = () => {
  const location = useLocation();
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].hash);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    console.log(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const itemsOnThisRoute = NAV_ITEMS.filter(
      (item) => item.path === location.pathname,
    );

    const sections = itemsOnThisRoute
      .map((item) => document.getElementById(item.hash))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-90px 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className={cx("navigation", { scrolled })}>
      <div className={cx("nav-inner")}>
        <nav className={cx("nav-links")}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.hash}
              to={`${item.path}#${item.hash}`}
              className={cx("nav-link", { active: activeId === item.hash })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavigationComponent;
