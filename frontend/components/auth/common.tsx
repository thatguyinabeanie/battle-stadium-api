import { Divider } from "@nextui-org/react";

const orDivider = (
  <div className="flex items-center gap-4 py-2">
    <Divider className="flex-1" />
    <p className="shrink-0 text-tiny text-default-500">OR</p>
    <Divider className="flex-1" />
  </div>
);

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 10 },
};

export interface LoginFormProps {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export { orDivider, variants };
