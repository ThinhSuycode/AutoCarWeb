import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import type { MouseEventHandler, ReactNode } from "react";
const cx = classNames.bind(styles);

interface PropsTypes {
  to?: string;
  href?: string;
  primary?: boolean;
  outline?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rounded?: boolean;
  text?: boolean;
  className?: string;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  disable?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
}

const Button = ({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disable = false,
  rounded = false,
  className,
  iconLeft,
  iconRight,
  children,
  onClick,
  ...passProps
}: PropsTypes) => {
  let Comp: any = "button";
  const classes = cx("wrapper", {
    [className as string]: !!className,
    primary,
    outline,
    small,
    large,
    rounded,
    text,
    iconLeft,
    iconRight,
    disable,
  });
  let props: any = {
    onClick,
    ...passProps,
  };
  // xoá sự kiện nếu disable
  if (disable) {
    Object.keys(props).forEach((key: string) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = "Link";
  }
  if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <Comp className={classes} {...props}>
      {iconLeft && <span className={cx("icon")}>{iconLeft}</span>}
      <span className={cx("title")}>{children}</span>
      {iconRight && <span className={cx("icon")}>{iconRight}</span>}
    </Comp>
  );
};

export default Button;
