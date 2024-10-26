import NavigationBar from "@/components/navbar/navbar";
import { type ChildrenProps } from "@/types";

export default function Body({ children }: Readonly<ChildrenProps>) {
  return (
    <main className="flex flex-col items-center ">
      <div className="flex flex-col min-h-screen w-3/4 z-0 items-center backdrop-blur-lg shadow-2xl gap-4 pt-4 pb-8 rounded-lg">
        <NavigationBar />
        <section className="flex flex-col gap-4 items-center">{children}</section>
      </div>
    </main>
  );
}
