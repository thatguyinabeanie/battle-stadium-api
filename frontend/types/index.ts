import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export interface ChildrenProps {
  children: React.ReactNode
}

export interface PageTitleProps {
  title: string
}
