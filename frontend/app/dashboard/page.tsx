import { Metadata } from "next";
import { getMe } from "@/app/data/actions";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const me = (await getMe())?.data;

  if (!me) {
    redirect("/sign-in");
  }

  return <Dashboard me={me} />;
}
