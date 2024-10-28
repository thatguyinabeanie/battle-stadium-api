import { Icon } from "@iconify/react/dist/iconify.js";
import { NavbarItem, Button } from "~/components/nextui/client-components";

export default function Search() {
  return (
    <NavbarItem>
      <Button isIconOnly radius="full" variant="light">
        <Icon className="text-default-500" icon="solar:magnifer-linear" width={22} />
      </Button>
    </NavbarItem>
  );
}
