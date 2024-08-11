import ChildrenProps from "@/types/childrenProps";

export default function Layout ({ children }: Readonly<ChildrenProps>) {
  return (
    <section className="flex flex-col items-center justify-evenly gap-4 ">
      <div className="inline-block w-full text-center justify-center">
        { children }
      </div>
    </section>
  );
}
