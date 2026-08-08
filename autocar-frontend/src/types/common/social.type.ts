import type { ReactNode } from "react";

export interface SocialItem {
  icon: ReactNode;

  title: string;

  href?: string;
}
