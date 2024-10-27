"use client";

import { Profile } from "@/lib/api";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  cn,
  Input,
} from "@/components/nextui/client-components";
import { postTournamentRegistration } from "@/app/server-actions/tournaments/actions";
import Form from "next/form";

interface RegistrationCardProps {
  org_slug: string;
  tournament_id: number;
  profiles: Profile[];
}

export default function RegistrationCard({ profiles, org_slug, tournament_id }: Readonly<RegistrationCardProps>) {
  const registerForTournament = async (formData: FormData) => {
    const in_game_name = formData.get("ign") as string;
    const profile = formData.get("profile") as string;

    const profile_id = profiles.find((p) => p.username == profile)?.id;

    if (profile_id) {
      await postTournamentRegistration({ tournament_id, in_game_name, profile_id });
    }
  };

  return (
    <Card
      className="bg-transparent inline-block max-w-fit text-center justify-center p-10 m-20 backdrop-blur rounded-3xl border-small border-neutral-500/40"
      shadow="md"
    >
      <CardHeader>
        Register for {org_slug} tournament {tournament_id}
      </CardHeader>

      <CardBody>
        <Form action={registerForTournament} className="grid grid-cols-1 gap-4">
          <Input label="In Game Name" name="ign" variant="underlined" />

          <Autocomplete
            allowsCustomValue={true}
            aria-label="Search for a profile"
            defaultItems={profiles}
            label="Profile"
            name="profile"
            placeholder="Search for a profile"
            variant="underlined"
          >
            {(profile) => (
              <AutocompleteItem key={profile.id} aria-label={profile.username} textValue={profile.username}>
                {profile.username}
                <Chip className={cn("ml-2", { hidden: !profile.default })} radius="full" size="sm">
                  default
                </Chip>
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Checkbox defaultSelected aria-label="Show your country flag?" name="country_flag" size="sm">
            Show your country flag?
          </Checkbox>

          <Button aria-label="Submit" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
