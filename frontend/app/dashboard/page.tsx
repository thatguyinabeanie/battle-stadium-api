import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div>
      <h1>Player dashboard page here</h1>
    </div>
  );
}
