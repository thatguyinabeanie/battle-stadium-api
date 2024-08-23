"use client";
import { usePathname } from "next/navigation";
import {
  ScrollShadow,
  Listbox,
  ListboxSection,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
  SlotsToClasses,
} from "@nextui-org/react";
import React from "react";

import useRenderSideBarItems from "./use-render-sidebar-items";

import { cn } from "@/lib/utils";

export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

export type ItemClassesType =
  | SlotsToClasses<"base" | "title" | "description" | "wrapper" | "selectedIcon" | "shortcut">
  | undefined;

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      isCompact,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref,
  ) => {
    const pathname = usePathname();
    const currentPath = pathname.split("/")?.[1];

    const [selected, setSelected] = React.useState<React.Key>(currentPath ?? defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, "w-full", {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: cn(sectionClassesProp?.group, {
        "flex flex-col gap-1": isCompact,
      }),
      heading: cn(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
    };

    const itemClasses: ItemClassesType = {
      ...itemClassesProp,
      base: cn(itemClassesProp?.base, {
        "w-11 h-11 gap-0 p-0": isCompact,
      }),
    };

    const { renderItem, renderNestItem, items } = useRenderSideBarItems({
      isCompact,
      hideEndContent,
      iconClassName,
      itemClasses,
    });

    return (
      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Listbox
          key={isCompact ? "compact" : "default"}
          ref={ref}
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
          {...props}
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
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
