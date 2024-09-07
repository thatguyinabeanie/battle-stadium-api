"use client";
import { title, subtitle } from "@/components/primitives";
export default function NextJSHome() {
  return (
    <div className="inline-block max-w-lg text-center justify-center">
      <h1 className={title({ color: "violet", size: "lg" })}>battlestadium.gg&nbsp;</h1>

      <br />

      <h2 className={title({ size: "sm" })}>a next-gen tournament website.</h2>
      <h2 className={subtitle({ class: "mt-4" })}>Beautiful, fast and modern. Coming Soon...</h2>
    </div>
  );
}
