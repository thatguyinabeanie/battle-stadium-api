"use client";
import { PageTitleProps } from "@/types";
import { title as titleClassnames } from "@/components/primitives";

export interface HeaderProps extends PageTitleProps {
  disabled?: boolean;
}
export default function Header({ title, disabled = false }: Readonly<HeaderProps>) {
  if (!title || title === "" || disabled) {
    return null;
  }

  return (
    <header className="flex items-center gap-1 rounded-medium border-small justify-center border-divider p-2 sticky">
      <h1 className={titleClassnames()}>{title}</h1>
    </header>
  );
}
