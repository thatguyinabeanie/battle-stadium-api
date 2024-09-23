import { Metadata } from "next";
import { getMe } from "@/app/data/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const clerkAuth = auth();

  if (!clerkAuth.sessionId) {
    redirect("/sign-in");
  }

  const { data: me } = await getMe();

  if (!me) {
    redirect("/error");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome, {me?.first_name} {me?.last_name}{" "}
      </p>
    </div>
  );
}
