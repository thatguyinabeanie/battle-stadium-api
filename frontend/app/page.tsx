import type { Metadata } from "next";

import NextJSHome from "@/components/nextjs-home";
import MainPageLayout from "@/components/main-page-layout";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <MainPageLayout>
      <NextJSHome />
    </MainPageLayout>
  );
}
