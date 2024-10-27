import { SVGProps, ReactNode } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ChildrenProps {
  children: ReactNode;
}

export interface PageTitleProps {
  title: string;
}

export interface DashboardLayoutProps extends ChildrenProps {
  profiles: ReactNode;
  pokemon: ReactNode;
  tournament_history: ReactNode;
  settings: ReactNode;
  admin: ReactNode;
}
