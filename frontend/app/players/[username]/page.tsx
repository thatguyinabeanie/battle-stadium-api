import { getAccount } from "@/app/server-actions/accounts/actions";
interface PlayerProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata ({ params }: Readonly<PlayerProfilePageProps>) {
  const { data: player } = await getAccount(params.username);

  return { title: player?.username ?? "Player" };
}

export default async function PlayerProfilePage({ params }: Readonly<PlayerProfilePageProps>) {
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
