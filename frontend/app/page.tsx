import type { Metadata } from "next";
import { title } from "@/components/primitives";
import { Card, Spacer } from "@/components/nextui-use-client";


export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <Card
      className="bg-transparent inline-block max-w-fit text-center justify-center p-10 m-20 backdrop-blur rounded-3xl border-small border-neutral-500/40"
      shadow="md"
    >
      <h1 className={title({ color: "violet", size: "xl" })}>battlestadium.gg</h1>

      <Spacer y={2} />

      <h2 className={title({ size: "xs" })}>a next-gen tournament website.</h2>
      <Spacer y={1} />
      <div className="flex flex-col justify-items-center">
        <h2 className={title({ size: "xxs" })}>beautiful, fast, modern.</h2>

        <Spacer y={4} />
        <h2 className={title({ color: "violet", size: "xs" })}>Coming Soon</h2>
      </div>
    </Card>
  );
}
