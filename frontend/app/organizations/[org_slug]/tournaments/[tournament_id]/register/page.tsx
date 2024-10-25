import TournamentRegistration from "@/components/tournaments/tournament-registration";

interface RegisterProps {
  params: {
    org_slug: string;
    tournament_id: number;
  };
}

export default async function Register(props: Readonly<RegisterProps>) {
  const params = await props.params;

  return <TournamentRegistration {...params} />;
}
