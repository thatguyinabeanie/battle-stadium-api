"use client"

import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];

  return (
    <header className="flex items-center gap-3 rounded-medium border-small  border-divider p-4 sticky">
      <h2 className="text-medium font-medium text-default-700">{currentPath}</h2>
    </header>
  )
}
