import NavigationBar from "@/components/navbar/navbar";
import { type ChildrenProps } from "@/types";

export default function Body({ children }: Readonly<ChildrenProps>) {
  return (
    <main className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col h-full w-3/4 z-0 justify-center items-center backdrop-blur-lg shadow-md gap-4 pt-4">
        <NavigationBar />
        <section className="flex flex-col gap-4 h-full items-center w-3/4">{children}</section>
      </div>
    </main>
  );
}
