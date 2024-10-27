import type { Metadata } from "next";
import { title } from "@/components/miscellaneous/primitives";
import { Spacer } from "@/components/nextui/client-components";
import PartneredOrganizations from "@/components/organizations/partnered-organizations";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center min--h-screen">
      <Spacer y={20} />
      <PartneredOrganizations />

      <Spacer y={10} />

      <div className="bg-transparent w-full inline-block max-w-fit text-center justify-center items-center">
        <h1 className={title({ color: "violet", size: "xl" })}>battlestadium.gg</h1>

        <Spacer y={2} />

        <h2 className={title({ size: "xs" })}>a next-gen tournament website.</h2>

        <Spacer y={1} />

        <div className="flex flex-col justify-items-center">
          <h2 className={title({ size: "xxs" })}>beautiful, fast, modern.</h2>

          <Spacer y={4} />
          <h2 className={title({ color: "violet", size: "xs" })}>Coming Soon</h2>
        </div>
      </div>
    </div>
  );
}
