"use client";

import { components } from "@/lib/api/openapi-v1";
import { Tabs, Tab } from "@nextui-org/react";

interface DashboardProps {
  me: components["schemas"]["UserMe"];
}
export default function Dashboard({ me }: Readonly<DashboardProps>) {
  return (
    <Tabs>
      <Tab key="photos" title="Photos">
        {me.first_name}
      </Tab>
    </Tabs>
  );
}
