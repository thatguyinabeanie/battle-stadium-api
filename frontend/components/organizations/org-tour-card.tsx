import OrganizationLogo from "@/components/organizations/organization-logo";
import { Organization, TournamentDetails } from "@/lib/api";
import { Spacer } from "@nextui-org/react";

interface OrgTourCardProps {
  organization: Organization;
  tournament: TournamentDetails;
}

export default function OrgTourCard({ organization, tournament }: Readonly<OrgTourCardProps>) {
  return (
    <div className="bg-transparent flex flex-row justify-between items-center w-full">
      <OrganizationLogo organization={organization} />

      <div className="flex flex-col justify-between items-center text-center mx-4 ">
        <h1 className="text-2xl font-semibold">{tournament.name}</h1>
        <h2 className="flex flex-row gap-1">
          <p className="font-bold">Presented By: </p>
          {organization?.name}
        </h2>

        <Spacer y={2} />

        <p>Registration: {tournament.registration_start_at}</p>
        <p>Starts: {tournament.start_at}</p>
        <p>Check in opens: {tournament.check_in_start_at} </p>

        <Spacer y={2} />

        <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
      </div>

      <OrganizationLogo className="hidden sm:flex" organization={organization} />
    </div>
  );
}
