import { NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";

import { Icon } from "../client";

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
