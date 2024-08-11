import React from "react";
import { Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Link } from "@nextui-org/link";

import { Avatar, Button } from "@/components/nextui-client-components";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";
import { sectionItemsWithTeams } from "@/components/sidebar-items";
import { AcmeIcon } from "@/components/acme";
import Header from "@/components/header";
import Body from "@/components/body";
import { BATTLE_STADIUM } from "@/lib/constants";

export interface SideBarComponentProps {
  children?: React.ReactNode;
  route?: string;
}


export default function SideBarComponent({ children, route }: SideBarComponentProps) {
  return (
    <div className="flex h-dvh w-full">
      <div
        className={cn(
          "relative flex h-full w-72 max-w-[288px] flex-1 flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out",
          {
            "-ml-72 -translate-x-72": false,
          },
        )}
      >
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <AcmeIcon className="text-background" />
          </div>
          <span className="text-small font-bold uppercase">{ BATTLE_STADIUM }</span>
        </div>

        <Spacer y={8} />

        <div className="flex items-center gap-3 px-3">
          <Avatar />
          <div className="flex flex-col">
            <p className="text-small font-medium text-default-600">John Doe</p>
            <p className="text-tiny text-default-400">Product Designer</p>
          </div>
        </div>

        <Sidebar defaultSelectedKey="home" items={sectionItemsWithTeams} />

        <Spacer y={8} />
        <div className="mt-auto flex flex-col">
          <Button
            fullWidth
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="text-default-500"
                icon="solar:info-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Help & Information
          </Button>
          <Button
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Log Out
          </Button>
        </div>
      </div>

      <div className="w-full flex-1 flex-col p-4">

        <Header route={route} />

        <main className="mt-4 h-full w-full overflow-visible">

          <Body>
            {children}
          </Body>
{/*
          <footer className="w-full flex items-center justify-center py-3">
            <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
              title="nextui.org homepage"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">NextUI</p>
            </Link>
          </footer> */}
        </main>
      </div>
    </div>
  );
}
