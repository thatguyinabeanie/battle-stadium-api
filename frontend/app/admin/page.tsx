import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMe } from "@/app/data/actions";
export const metadata: Metadata = {
  title: "Admin",
};

export default async function Admin() {
  if (!auth().sessionId) {
    return redirect("/sign-in");
  }

  const me = (await getMe())?.data;

  if (!me?.admin) {
    return redirect("/");
  }

  return (
    <div>
      <h1>You are an admin</h1>
    </div>
  );
}
