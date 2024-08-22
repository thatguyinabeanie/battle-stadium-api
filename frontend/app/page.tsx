import NextJSHome from "@/components/nextjs-home"
import MainPageLayout from "@/components/main-page-layout"
export default function Home() {
  return (
    <MainPageLayout disableHeader title="Home">
      <NextJSHome />
    </MainPageLayout>
  )
}
