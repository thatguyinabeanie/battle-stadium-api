import { Metadata } from "next";
import { getMe } from "@/app/data/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const clerkAuth = auth();

  if (!clerkAuth.sessionId) {
    redirect("/sign-in");
  }

  const { data: me } = await getMe();

  if (!me) {
    redirect("/error");
  }

  return <Dashboard me={me} />;
}
