import { getUser } from "@/app/data/users/actions";

export async function generateMetadata({ params }: { params: { username: string } }) {
  const { data: player } = await getUser(params.username);

  return { title: player?.username ?? "Player" };
}

export default async function PlayerProfilePage({ params }: { params: { username: string } }) {
  const { data: player } = await getUser(params.username);

  return (
    <div>
      <h1>{player?.username}</h1>
      <p>
        {player?.first_name} {player?.last_name}
      </p>
    </div>
  );
}
