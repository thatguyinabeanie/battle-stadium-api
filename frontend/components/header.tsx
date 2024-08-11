import { headers } from 'next/headers';
import { title } from "./primitives";

export interface HeaderProps {
  route?: string;
}

export default function Header ({route}: HeaderProps) {
  console.log('header route', route)

  if (!route) return null

  return (
    <header className="flex items-center gap-3 rounded-medium border-small justify-center border-divider p-4 sticky">
      <h1 className={ title() }>{ route || 'Home' }</h1>
    </header>
  )
}
