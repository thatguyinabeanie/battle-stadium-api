import { getAccount } from "@/app/server-actions/accounts/actions";
interface PlayerProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata(props: Readonly<PlayerProfilePageProps>) {
  const params = await props.params;
  const { data: player } = await getAccount(params.username);

  return { title: player?.username ?? "Player" };
}

export default async function PlayerProfilePage(props: Readonly<PlayerProfilePageProps>) {
  const params = await props.params;
  const { data: player } = await getAccount(params.username);

  return (
    <div>
      <h1>{player?.username}</h1>
      <p>
        {player?.first_name} {player?.last_name}
      </p>
    </div>
  );
}
