import { Icon } from "@iconify/react/dist/iconify.js";
import { NavbarItem, Button, Input } from "@nextui-org/react";

export default function Search() {
  return (
    <>
      <NavbarItem className="mr-2 hidden md:flex min-w-52">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-content2 dark:bg-content1",
          }}
          labelPlacement="outside"
          placeholder="Search..."
          radius="full"
          startContent={<Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />}
        />
      </NavbarItem>

      <NavbarItem className="md:hidden">
        <Button isIconOnly radius="full" variant="light">
          <Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />
        </Button>
      </NavbarItem>
    </>
  );
}
