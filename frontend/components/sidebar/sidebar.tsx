"use client";
import { usePathname } from "next/navigation";
import {
  Listbox,
  ListboxSection,
  ScrollShadow,
  Spacer,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
} from "@nextui-org/react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import BattleStadium from "@/components/battle-stadium";

import UserAvatar from "../user-avatar";

import useRenderSideBarItems from "./use-render-sidebar-items";
import Logout from "./sign-out";
import SignOut from "./sign-out";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  iconSelected?: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

export default function Sidebar(props: SidebarProps) {
  const {
    defaultSelectedKey,
    onSelect,
    hideEndContent,
    sectionClasses: sectionClassesProp = {},
    itemClasses: itemClassesProp = {},
    iconClassName,
    classNames,
    className,
    ...rest
  } = props;

  const currentPath = usePathname()?.split("/")?.[1];
  const [selected, setSelected] = React.useState<React.Key>(currentPath ?? defaultSelectedKey);

  const { renderItem, renderNestItem, items, itemClasses, sectionClasses } = useRenderSideBarItems({
    hideEndContent,
    iconClassName,
    sectionClassesProp,
    itemClassesProp,
  });

  const isCompact = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <BattleStadium aria-label="Battle Stadium Logo" />

      <Spacer y={8} />

      <UserAvatar />

      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Listbox
          key={isCompact ? "compact" : "default"}
          hideSelectedIcon
          aria-label="Sidebar Listbox"
          as="nav"
          className={cn("list-none", className)}
          classNames={{
            ...classNames,
            list: cn("items-center", classNames?.list),
          }}
          color="default"
          itemClasses={{
            ...itemClasses,
            base: cn("px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100", itemClasses?.base),
            title: cn(
              "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
              itemClasses?.title,
            ),
          }}
          items={items}
          selectedKeys={[selected] as unknown as Selection}
          selectionMode="single"
          variant="flat"
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];

            setSelected(key as React.Key);
            onSelect?.(key as string);
          }}
          {...rest}
        >
          {(item) => {
            return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
              renderNestItem(item)
            ) : item.items && item.items?.length > 0 ? (
              <ListboxSection key={item.key} classNames={sectionClasses} showDivider={isCompact} title={item.title}>
                {item.items.map(renderItem)}
              </ListboxSection>
            ) : (
              renderItem(item)
            );
          }}
        </Listbox>
      </ScrollShadow>

      <Spacer y={2} />

      <SignOut isCompact={isCompact} />
    </>
  );
}
