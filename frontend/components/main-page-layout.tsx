import { ChildrenProps } from "@/types"
import Header from "@/components/header"

export interface MainPageLayoutProps extends ChildrenProps {
  title: string
  disableHeader?: boolean
}

export default function MainPageLayout({ children, title, disableHeader = false }: Readonly<MainPageLayoutProps>) {
  return (
    <div className="w-full flex-1 flex-col p-4">
      <Header disabled={disableHeader} title={title} />

      <main className="h-full flex flex-col gap-4 rounded-medium border-divider overflow-auto">
        <section className="flex flex-col gap-4 py-8 md:py-10 h-full w-ful items-center">{children}</section>
      </main>
    </div>
  )
}
