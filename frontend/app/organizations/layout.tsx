import ChildrenProps from "@/types/childrenProps";

export default function Layout ({ children }: Readonly<ChildrenProps>) {
  return (
    <section className="flex flex-col items-center justify-evenly gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        { children }
      </div>
    </section>
  );
}
