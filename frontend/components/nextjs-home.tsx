"use client";
import { title, subtitle } from "@/components/primitives";
export default function NextJSHome() {

  return (

    <div className="inline-block max-w-lg text-center justify-center">
      <h1 className={title()}>Make&nbsp;</h1>
      <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
      <br />
      <h1 className={title()}>websites regardless of your design experience.</h1>
      <h2 className={subtitle({ class: "mt-4" })}>Beautiful, fast and modern React UI library.</h2>
    </div>

  );
}
