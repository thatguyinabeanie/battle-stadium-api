import type { Metadata } from "next";
import { title, subtitle } from "@/components/primitives";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <div className="inline-block max-w-fit text-center justify-center p-10 m-20 backdrop-blur-md border-small rounded-3xl border-opacity-15 border-neutral-400">
      <h1 className={title({ color: "violet", size: "2xl" })}>battlestadium.gg&nbsp;</h1>

      <br />

      <h2 className={title({ size: "xs" })}>a next-gen tournament website.</h2>
      <h2 className={subtitle({ class: "mt-4" })}>beautiful, fast and modern.</h2>
      <h2 className={title({ color: "violet", size: "xs" })}>Coming Soon...</h2>
    </div>
  );
}
