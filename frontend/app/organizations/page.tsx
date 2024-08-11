import React from "react";
import clsx from "clsx";

import Organizations from "./Organizations";

import { BattleStadiumAPI } from "@/battle-stadium-api";

export default async function OrganizationsPage() {
  const organizations = await BattleStadiumAPI.Organizations.list();

  return (
    <>
      <div
        className={clsx(
          "container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
        )}
      >
        <Organizations initialOrganizations={organizations} />
      </div>
    </>
  );
}
