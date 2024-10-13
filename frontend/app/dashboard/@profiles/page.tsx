import { getAccountsMe } from "@/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "@/app/server-actions/profiles/actions";


export default async function Profiles() {

  const me = (await getAccountsMe())?.data;
  if (!me) {
    return null;
  }

  const profiles = (await getProfilesByAccountId(me.id))?.data;

  console.log('profiles:', profiles);

  return (
    <div>
      <h1>Profiles</h1>
      {
        profiles?.map((profile) => (
          <div key={profile.id}>
            <p>{ profile.id }</p>
            <p>{profile.username}</p>
            <p>{profile.pronouns}</p>
            <p>{ profile.default}</p>
            <p>{ profile.image_url }</p>
          </div>
        ))
      }
    </div>
  );
}
