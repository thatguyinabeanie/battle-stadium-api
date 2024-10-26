interface MatchPageProps {
  org_slug: string;
  tournament_id: string;
  matchId: number;
}

export default function MatchPage({ matchId }: Readonly<MatchPageProps>) {
  // return <ChatComponent channelName={"ChatChannel"} roomName={matchId} websocketUrl={websocketUrl()} />;
  return <div>Match Page {matchId}</div>;
}
