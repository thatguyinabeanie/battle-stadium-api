"use client";

import AppearanceSetting from "@/components/settings/appearance-settings";
import AccountSetting from "@/components/settings/account-settings";
import BillingSetting from "@/components/settings/bill-settings";

import { Button, Tab, Tabs, useDisclosure } from "@/components/nextui-use-client";
import { Icon } from "@iconify/react/dist/iconify.js";

export const runtime = "edge";

export default function Settings() {
  const { onOpenChange } = useDisclosure();

  return (
    <div className="w-full max-w-2xl flex-col p-10 rounded-3xl backdrop-blur border-small border-opacity-15 border-neutral-400">
      {/* Title */}
      <div className="flex items-center gap-x-3">
        <Button isIconOnly className="sm:hidden" size="sm" variant="flat" onPress={onOpenChange}>
          <Icon className="text-default-500" icon="solar:sidebar-minimalistic-linear" width={20} />
        </Button>
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">Settings</h1>
      </div>
      <h2 className="mt-2 text-small text-default-500">Customize settings, email preferences, and web appearance.</h2>
      {/*  Tabs */}
      <Tabs
        fullWidth
        classNames={{
          base: "mt-6",
          cursor: "bg-content1 dark:bg-content1",
          panel: "w-full p-0 pt-4",
        }}
      >
        <Tab key="account" title="Account">
          <AccountSetting />
        </Tab>

        <Tab key="appearance" title="Appearance">
          <AppearanceSetting />
        </Tab>

        <Tab key="connections" title="Connections">
          <BillingSetting />
        </Tab>
      </Tabs>
    </div>
  );
}
