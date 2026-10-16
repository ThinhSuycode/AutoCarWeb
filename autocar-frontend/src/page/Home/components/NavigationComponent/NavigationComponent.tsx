import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NavigationComponent.module.scss";

const cx = classNames.bind(styles);

const NAV_ITEMS = [
  { path: "/", hash: "home-banner", label: "Trang chủ" },
  { path: "/", hash: "home-about", label: "Giới thiệu" },
  { path: "/", hash: "home-products", label: "Sản phẩm" },
  { path: "/", hash: "home-why-choose", label: "Vì sao chọn chúng tôi" },
  // { path: "/", hash: "home-contact", label: "Liên hệ" },
];

// Chiều cao header cố định, dùng để bù trừ khi cuộn tới section
const HEADER_OFFSET = 100;

const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};

const NavigationComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].hash);
  const [scrolled, setScrolled] = useState(false);
  const pendingHashRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Xử lý khi vào thẳng URL có hash (mở link chia sẻ, back/forward, điều hướng từ trang khác sang)
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    if (pendingHashRef.current === hash) {
      pendingHashRef.current = null;
      return;
    }

    const timer = window.setTimeout(() => scrollToId(hash), 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

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

  const handleNavClick =
    (item: (typeof NAV_ITEMS)[number]) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveId(item.hash);

      if (location.pathname === item.path) {
        // Đang ở đúng trang -> chỉ cần cuộn, không cần điều hướng lại
        pendingHashRef.current = item.hash;
        window.history.replaceState(null, "", `${item.path}#${item.hash}`);
        scrollToId(item.hash);
      } else {
        // Khác trang -> điều hướng sang, effect ở trên sẽ tự cuộn sau khi trang mới render
        navigate(`${item.path}#${item.hash}`);
      }
    };

  return (
    <header className={cx("navigation", { scrolled })}>
      <div className={cx("nav-inner")}>
        <nav className={cx("nav-links")}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.hash}
              href={`${item.path}#${item.hash}`}
              onClick={handleNavClick(item)}
              className={cx("nav-link", { active: activeId === item.hash })}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavigationComponent;
