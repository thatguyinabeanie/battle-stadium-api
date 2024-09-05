import NextJSHome from "@/components/nextjs-home";
import Header from "@/components/header";
import MainPageLayout from "@/components/main-page-layout";
export default function Home() {
  return (
    <MainPageLayout>
      <Header disabled title="Home" />
      <NextJSHome />
    </MainPageLayout>
  );
}
