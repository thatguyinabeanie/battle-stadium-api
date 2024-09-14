import { NavbarItem, Button } from "@nextui-org/react";

import { Icon } from "../client";

export default function Settings() {
  return (
    <NavbarItem className="hidden md:flex">
      <Button isIconOnly radius="full" variant="light">
        <Icon className="text-default-500" icon="solar:settings-linear" width={24} />
      </Button>
    </NavbarItem>
  );
}
