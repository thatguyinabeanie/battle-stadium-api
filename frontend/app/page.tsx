import type { Metadata } from "next";
import { title } from "@/components/primitives";
import { Card, CardBody, CardFooter, CardHeader, Spacer } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <Card
      className="bg-transparent  inline-block max-w-fit text-center justify-center p-10 m-20 backdrop-blur-lg rounded-3xl"
      shadow="md"
    >
      <CardHeader>
        <h1 className={title({ color: "violet", size: "2xl" })}>battlestadium.gg&nbsp;</h1>
      </CardHeader>

      <Spacer y={2} />

      <CardBody className="justify-center items-center flex flex-col">
        <h2 className={title({ size: "xs" })}>a next-gen tournament website.</h2>
        <Spacer y={1} />
        <h2 className={title({ size: "xxs" })}>beautiful, fast, modern.</h2>
      </CardBody>

      <CardFooter className="justify-center items-center flex flex-col">
        <h2 className={title({ color: "violet", size: "xs" })}>Coming Soon...</h2>
      </CardFooter>
    </Card>
  );
}
