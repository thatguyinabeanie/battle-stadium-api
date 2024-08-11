
import ChildrenProps from "@/types/childrenProps";
export default function Body({ children }: Readonly<ChildrenProps>) {
  return (
    <div className="flex h-[99%] w-full flex-col gap-4 rounded-medium border-divider overflow-auto">
      { children }
    </div>
  )
}
