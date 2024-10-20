import { getAccountMe } from "@/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "@/app/server-actions/profiles/actions";
import { redirect } from "next/navigation";
import RegistrationCard from "./registration-card";

interface TournamentRegisterProps {
  org_slug: string;
  tournament_id: number;
}

export default async function TournamentRegistration({ org_slug, tournament_id }: Readonly<TournamentRegisterProps>) {
  const me = (await getAccountMe())?.data;

  if (!me) {
    redirect("/sign-in");
  }

  const profiles = (await getProfilesByAccountId(me?.id)).data ?? [];

  return <RegistrationCard org_slug={org_slug} profiles={profiles} tournament_id={tournament_id} />;
}
