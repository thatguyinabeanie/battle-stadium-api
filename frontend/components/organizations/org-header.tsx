import { ReactNode } from "react";
import { Organization } from "~/lib/api";
import OrganizationLogo from "./organization-logo";

interface OrganizationHeaderProps {
  children: ReactNode;
  organization: Organization;
}

const HEIGHT_WIDTH = 175;

export default function OrganizationHeader({ children, organization }: Readonly<OrganizationHeaderProps>) {
  return (
    <div className="flex flex-row justify-center items-center w-full">
      <OrganizationLogo logoSize={HEIGHT_WIDTH} organization={organization} />

      <div className="flex flex-col justify-between items-center text-center mx-4 ">{children}</div>

      <OrganizationLogo className="hidden sm:flex" logoSize={HEIGHT_WIDTH} organization={organization} />
    </div>
  );
}
