import { getAccountMe } from "@/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "@/app/server-actions/profiles/actions";
import NewProfile from "@/components/profiles/new-profile";
import { ProfilesTable } from "@/components/profiles/profiles-table";

export default async function Profiles() {
  const me = (await getAccountMe())?.data;

  if (!me) {
    return null;
  }

  const profiles = (await getProfilesByAccountId(me.id))?.data;

  return (
    <div>
      <NewProfile me={me} />
      {profiles && <ProfilesTable profiles={profiles} />}
    </div>
  );
}
