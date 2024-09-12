import type { Metadata } from "next";

import NextJSHome from "@/components/nextjs-home";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return <NextJSHome />;
}
