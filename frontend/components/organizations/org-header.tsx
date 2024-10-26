import { Organization } from "@/lib/api";
import OrganizationLogo from "./organization-logo";
import { Divider } from "@nextui-org/react";

interface OrganizationHeaderProps {
  children: React.ReactNode;
  organization: Organization;
}
export default function OrganizationHeader({ children, organization }: Readonly<OrganizationHeaderProps>) {
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <OrganizationLogo organization={organization} />

        <div className="flex flex-col justify-between items-center text-center mx-4 ">{children}</div>

        <OrganizationLogo className="hidden sm:flex" organization={organization} />

      </div>

      <Divider />
    </>
  );
}