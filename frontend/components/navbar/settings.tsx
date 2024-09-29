import { Icon } from "@iconify/react/dist/iconify.js";
import { NavbarItem, Button } from "@/components/nextui-use-client";
import Link from "next/link";

export default function Settings() {
  return (
    <NavbarItem className="hidden lg:flex">
      <Link passHref href="/settings">
        <Button isIconOnly radius="full" variant="light">
          <Icon className="text-default-500" icon="solar:settings-linear" width={24} />
        </Button>
      </Link>
    </NavbarItem>
  );
}
