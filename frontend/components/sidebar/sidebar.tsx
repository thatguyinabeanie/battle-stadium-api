"use client";
import { usePathname } from "next/navigation";
import {
  Listbox,
  ListboxSection,
  type ListboxProps,
  type ListboxSectionProps,
  type Selection,
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

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>((props, ref) => {
  const {
    isCompact,
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

  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];
  const [selected, setSelected] = React.useState<React.Key>(currentPath ?? defaultSelectedKey);

  const { renderItem, renderNestItem, items, itemClasses, sectionClasses } = useRenderSideBarItems({
    isCompact,
    hideEndContent,
    iconClassName,
    sectionClassesProp,
    itemClassesProp,
  });

  return (
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
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
