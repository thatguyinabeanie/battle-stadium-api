import TournamentRegistration from "@/components/tournament-registration";

interface RegisterProps {
  params: {
    org_slug: string;
    tournament_id: number;
  };
}

export default function Register({ params }: Readonly<RegisterProps>) {
  return <TournamentRegistration {...params} />;
}
