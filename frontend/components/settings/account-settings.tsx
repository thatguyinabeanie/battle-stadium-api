"use client";

import * as React from "react";
import { Autocomplete, AutocompleteItem, Button, Input, Spacer } from "@/components/nextui/client-components";

import { cn } from "@/lib/utils";

import { countries } from "countries-list";
import { hasFlag } from "country-flag-icons";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useTimezoneSelect, allTimezones as timezones } from "react-timezone-select";

interface AccountSettingCardProps {
  className?: string;
}

const labelStyle = "original";

const AccountSetting = React.forwardRef<HTMLDivElement, AccountSettingCardProps>(({ className, ...props }, ref) => {
  const [timeZoneValue, setTimeZoneValue] = React.useState<string>("");
  const [timeZoneSelectedKey, setTimeZoneSelectedKey] = React.useState<React.Key | null>(null);
  const onTimeZoneSelectionChange = (id: React.Key | null) => setTimeZoneSelectedKey(id);
  const onTimeZoneInputChange = (value: string) => setTimeZoneValue(value);

  const [countryValue, setCountryValue] = React.useState("");
  const [countrySelectedKey, setCountrySelectedKey] = React.useState<React.Key | null>(null);
  const onCountrySelectionChange = (id: React.Key | null) => setCountrySelectedKey(id);
  const onCountryInputChange = (value: string) => setCountryValue(value);

  console.log(timeZoneSelectedKey, countrySelectedKey); // eslint-disable-line no-console
  const { options } = useTimezoneSelect({ labelStyle, timezones });

  const countriesList = Object.entries(countries)
    .filter(([key, _value]) => hasFlag(key))
    .map(([key, value]) => ({ key, label: `${getUnicodeFlagIcon(key)} ${value.name}` }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div ref={ref} className={cn("p-2", className)} {...props}>
      <section>
        <p className="text-base font-medium text-default-700">Name</p>
        <div className="flex flex-row gap-4">
          <Input label="First Name" radius="sm" type="email" variant={"underlined"} />
          <Input label="Last Name" radius="sm" type="email" variant="underlined" />
        </div>
      </section>

      <Spacer y={2} />

      <section>
        <p className="text-base font-medium text-default-700">Country</p>

        <Autocomplete
          allowsCustomValue={true}
          aria-label="Select your country"
          label="Select your country"
          placeholder="Search for a country"
          selectedKey={countryValue}
          variant="underlined"
          onInputChange={onCountryInputChange}
          onSelectionChange={onCountrySelectionChange}
        >
          {countriesList.map(({ key, label }) => (
            <AutocompleteItem key={key} aria-label={key} value={key}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </section>

      <Spacer y={2} />

      <section>
        <p className="text-base font-medium text-default-700">Timezone</p>
        <Autocomplete
          allowsCustomValue={true}
          aria-label="Select your timezone"
          label="Select your timezone"
          placeholder="Search for a timezone"
          selectedKey={timeZoneValue}
          variant="underlined"
          onInputChange={onTimeZoneInputChange}
          onSelectionChange={onTimeZoneSelectionChange}
        >
          {options.map(({ value, label }) => (
            <AutocompleteItem key={value} aria-label={value} value={value}>
              {label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </section>

      <Spacer y={2} />

      <Button className="mt-4 bg-default-foreground text-background" size="sm">
        Update Account
      </Button>
    </div>
  );
});

AccountSetting.displayName = "AccountSetting";

export default AccountSetting;
