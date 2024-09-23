import { Metadata } from "next";

import { Text } from "@/components/text";
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
      <Text tag="h1" variant="header">
        Admin Pages here
      </Text>
    </div>
  );
}
