import { Organization } from "~/lib/api";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface OrganizationLogoProps {
  alt?: string;
  src?: string;
  priority?: boolean;
  organization: Organization;
  className?: string;
  logoSize: number;
  blurDataURL?: string;
  placeholder?: PlaceholderValue;
}

const DEFAULT_BLUR_DATA_URL = "/pokemon/vgc.png";

export default function OrganizationLogo({
  alt,
  src,
  priority,
  placeholder,
  organization,
  className,
  logoSize,
  blurDataURL,
}: Readonly<OrganizationLogoProps>) {
  return (
    <Image
      alt={alt ?? organization?.name}
      aria-label={organization?.name}
      blurDataURL={blurDataURL ?? DEFAULT_BLUR_DATA_URL}
      className={className}
      height={logoSize}
      placeholder={placeholder ?? "blur"}
      priority={priority ?? false}
      src={src ?? organization?.logo_url ?? DEFAULT_BLUR_DATA_URL}
      width={logoSize}
    />
  );
}
