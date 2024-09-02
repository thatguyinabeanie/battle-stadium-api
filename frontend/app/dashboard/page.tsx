import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <div>Not signed in</div>;
  }

  try {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {session.user?.name}</p>
      </div>
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
