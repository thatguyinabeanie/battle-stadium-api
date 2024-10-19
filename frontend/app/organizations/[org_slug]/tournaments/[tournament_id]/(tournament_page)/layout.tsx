interface OrganizationTournamentsTournamentLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  standings: React.ReactNode;
  pairings: React.ReactNode;
  matches: React.ReactNode;
  metagame: React.ReactNode;
}

export default function OrganizationTournamentsTournamentLayout(props: OrganizationTournamentsTournamentLayoutProps) {
  return (
    <>
      {props.modal}
      {props.children}
      {props.standings}
      {props.pairings}
      {props.matches}
      {props.metagame}
    </>
  );
}
