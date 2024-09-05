import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <div>Not signed in</div>;
  }
  const { firstName, lastName } = session?.user ?? {};

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {`${firstName} ${lastName}`}</p>
    </div>
  );
}
