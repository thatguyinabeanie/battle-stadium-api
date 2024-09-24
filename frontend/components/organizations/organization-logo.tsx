import { Organization } from "@/lib/api";
import { Image } from "@nextui-org/react";

interface OrganizationLogoProps {
  organization: Organization;
  className?: string;
}

export default function OrganizationLogo({ organization, className }: Readonly<OrganizationLogoProps>) {
  return (
    <Image
      alt={organization?.name}
      aria-label={organization?.name}
      className={`aspect-square gap-3 h-[6.25rem] w-[6.25rem] md:h-[9.375rem] md:w-[9.375rem] lg:h-[12.5rem] lg:w-[12.5rem] ${className}`}
      src={organization?.logo_url ?? "/pokemon/vgc.png"}
    />
  );
}
