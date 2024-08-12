import React from "react";

import Organizations from "./Organizations";

import { BattleStadiumAPI } from "@/battle-stadium-api";

export default async function OrganizationsPage() {
  const organizations = await BattleStadiumAPI.Organizations.list();

  return <Organizations initialOrganizations={organizations} />;
}
