interface TournamentRegisterProps {
  org_slug: string;
  tournament_id: number;
}

export default function TournamentRegistration({ org_slug, tournament_id }: Readonly<TournamentRegisterProps>) {
  return (
    <div>
      <h1>
        Register for org {org_slug} tournament {tournament_id} here
      </h1>
    </div>
  );
}
