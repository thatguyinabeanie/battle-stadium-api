import React from "react";


import { title } from "@/components/primitives";
import { BattleStadiumAPI} from "@/battle-stadium-api";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import clsx from "clsx";
import { Organization } from "@/lib/api";
import Organizations from "./Organizations";


export default async function OrganizationsPage() {

  const organizations = await BattleStadiumAPI.Organizations.list();
  return (
    <div>

      <h1 className={title()}>
        Organizations
      </h1>

      <div className={clsx("container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4")}>
        <Organizations initialOrganizations={ organizations }/>
      </div>
    </div>
  );
}
