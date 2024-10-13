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
  admin: React.ReactNode;
  profiles: React.ReactNode;
  settings: React.ReactNode;
  tournament_history: React.ReactNode;
}
