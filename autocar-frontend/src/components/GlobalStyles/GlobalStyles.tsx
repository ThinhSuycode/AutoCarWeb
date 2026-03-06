import type React from "react";
import "./GlobalStyles.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const GlobalStyles = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return <>{children}</>;
};

export default GlobalStyles;
