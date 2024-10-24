import AwesomeParticles from "./awesome-particles";
import NavigationBar from "./navbar/navbar";
import Providers from "./providers";
import { ChildrenProps } from "@/types";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

export default function Body({ children }: Readonly<ChildrenProps>) {
  return (
    <Providers>
      <AwesomeParticles />
      <div className="flex flex-col w-full h-full items-center">
        <main className="flex flex-col h-full w-3/4 z-0 justify-center items-center backdrop-blur-lg shadow-md gap-4 pt-4">
          <NavigationBar />
          <section className="flex flex-col gap-4 h-full items-center w-3/4">
            {children}
          </section>
        </main>
      </div>
    </Providers>
  );
}
