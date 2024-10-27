import { Organization } from "@/lib/api";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface OrganizationLogoProps {
  alt?: string;
  src?: string;
  priority?: boolean;
  organization: Organization;
  className?: string;
  height?: number;
  width?: number;
  blurDataURL?: string;
  placeholder?: PlaceholderValue;
}
const DEFAULT_HEIGHT_WIDTH = 100;
const DEFAULT_BLUR_DATA_URL = "/pokemon/vgc.png";

export default function OrganizationLogo({
  alt,
  src,
  priority,
  placeholder,
  organization,
  className,
  height,
  width,
  blurDataURL,
}: Readonly<OrganizationLogoProps>) {
  return (
    <Image
      alt={alt ?? organization?.name}
      aria-label={organization?.name}
      blurDataURL={blurDataURL ?? DEFAULT_BLUR_DATA_URL}
      className={className}
      height={height ?? DEFAULT_HEIGHT_WIDTH}
      placeholder={placeholder ?? "blur"}
      priority={priority ?? false}
      src={src ?? organization?.logo_url ?? DEFAULT_BLUR_DATA_URL}
      width={width ?? DEFAULT_HEIGHT_WIDTH}
    />
  );
}
