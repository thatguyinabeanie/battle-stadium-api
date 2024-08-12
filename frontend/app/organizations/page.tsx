import React from "react";

import OrganizationsGrid from "./Organizations";

import { BattleStadiumAPI } from "@/battle-stadium-api";

const OrganizationsPage = async () => (
  <OrganizationsGrid
    initialOrganizations={await BattleStadiumAPI.Organizations.list()}
  />
);

export default OrganizationsPage;
