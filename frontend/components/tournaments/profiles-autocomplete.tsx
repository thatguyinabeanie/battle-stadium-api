"use client";

import { Profile } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Autocomplete, AutocompleteItem, Chip } from "@/components/nextui/client-components";

interface ProfilesAutocompleteProps {
  profiles: Profile[];
}
export default function ProfilesAutocomplete({profiles}: Readonly<ProfilesAutocompleteProps>) {
  return (
    <Autocomplete
      allowsCustomValue={ true }
      aria-label="Search for a profile"
      defaultItems={ profiles }
      label="Profile"
      name="profile"
      placeholder="Search for a profile"
      variant="underlined"
    >
      { (profile) => (
        <AutocompleteItem key={ profile.id } aria-label={ profile.username } textValue={ profile.username }>
          { profile.username }
          <Chip className={ cn("ml-2", { hidden: !profile.default }) } radius="full" size="sm">
            default
          </Chip>
        </AutocompleteItem>
      ) }
    </Autocomplete>
  );
}
