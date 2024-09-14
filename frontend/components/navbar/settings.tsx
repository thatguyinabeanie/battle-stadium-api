import { NavbarItem, Button } from "@nextui-org/react";

import { Icon } from "../client";
import Link from "next/link";

export default function Settings() {
  return (
    <NavbarItem className="hidden md:flex">
      <Link href="/settings" passHref>
        <Button isIconOnly radius="full" variant="light">
          <Icon className="text-default-500" icon="solar:settings-linear" width={24} />
        </Button>
      </Link>
    </NavbarItem>
  );
}
