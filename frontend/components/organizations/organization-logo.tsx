import { Organization } from "@/lib/api";
import Image from "next/image";

interface OrganizationLogoProps {
  organization: Organization;
  className?: string;
}

export default function OrganizationLogo({ organization, className }: Readonly<OrganizationLogoProps>) {
  return (
    <Image
      priority
      alt={organization?.name}
      aria-label={organization?.name}
      blurDataURL={organization?.logo_url ?? "/pokemon/vgc.png"}
      className={`aspect-square gap-3 h-[6.25rem] w-[6.25rem] md:h-[9.375rem] md:w-[9.375rem] lg:h-[12.5rem] lg:w-[12.5rem] ${className}`}
      height={2000}
      placeholder="blur"
      src={organization?.logo_url ?? "/pokemon/vgc.png"}
      width={2000}
    />
  );
}
