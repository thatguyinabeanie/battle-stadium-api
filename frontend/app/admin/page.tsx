import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getMe } from "@/app/data/actions";
export const metadata: Metadata = {
  title: "Admin",
};

export default async function Admin() {
  if (auth().sessionId) {
    return redirect("/sign-in");
  }

  const { data: me } = await getMe();

  if (!me?.admin) {
    return redirect("/");
  }

  return (
    <div>
      <h1 >
        Admin Pages here
      </h1>
    </div>
  );
}
