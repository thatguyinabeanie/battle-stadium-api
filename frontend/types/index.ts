import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface PageTitleProps {
  title: string;
}

export interface DashboardLayoutProps extends ChildrenProps {
  profiles: React.ReactNode;
  pokemon: React.ReactNode;
  tournament_history: React.ReactNode;
  settings: React.ReactNode;
  admin: React.ReactNode;
}
