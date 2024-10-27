import { Icon } from "@iconify/react/dist/iconify.js";
import { NavbarItem, Button } from "@/components/nextui/client-components";
import Link from "next/link";
import { AccountMe } from "@/lib/api";
import { cn } from "@/lib";

interface SettingsProps {
  me?: AccountMe;
}

export default function Settings({ me }: Readonly<SettingsProps>) {
  return (
    <NavbarItem
      className={cn("hidden", {
        "lg:flex": !!me,
      })}
    >
      <Link passHref href="/dashboard?tab=settings">
        <Button isIconOnly radius="full" variant="light">
          <Icon className="text-default-500" icon="solar:settings-linear" width={24} />
        </Button>
      </Link>
    </NavbarItem>
  );
}
