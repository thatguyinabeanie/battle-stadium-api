"use client";

import {
  ListboxItem,
  Tooltip,
  Accordion,
  AccordionItem,
  Listbox,
  SlotsToClasses,
  ListboxSection,
} from "@nextui-org/react";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { IconifyIcon } from "@iconify/react/dist/iconify.js";

import { cn } from "@/lib/utils";

import { Icon } from "../client";

import { SidebarItem, SidebarItemType, SidebarProps } from "./sidebar";
import useSideBarItems from "./useSideBarItems";

export type ItemClassesType =
  | SlotsToClasses<"base" | "title" | "description" | "wrapper" | "selectedIcon" | "shortcut">
  | undefined;
export type SectionClassesType = SlotsToClasses<"base" | "group" | "heading" | "divider">;

export interface RenderSideBarItemsProps {
  hideEndContent?: boolean;
  iconClassName?: string;
  itemClassesProp?: ItemClassesType;
  sectionClassesProp: SectionClassesType;
  itemClasses?: ItemClassesType;
  defaultSelectedKey: string;
}

export default function useRenderSideBarItems({
  hideEndContent,
  iconClassName,
  itemClassesProp,
  sectionClassesProp,
  defaultSelectedKey,
}: RenderSideBarItemsProps) {
  const items = useSideBarItems();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const { sectionClasses, itemClasses } = useSidebarClasses(sectionClassesProp, itemClassesProp);

  const { selected, setSelected } = useSetSelectedSideBarItem({ defaultSelectedKey });
  const renderStartContent = useRenderStartContent(isCompact, iconClassName);

  const renderNestItem = React.useCallback(
    (item: SidebarItem) => {
      const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

      if (isNestType) {
        // Is a nest type item , so we need to remove the href
        delete item.href;
      }

      return (
        <ListboxItem
          aria-label="Sidebar Nested ListboxItem"
          {...item}
          key={item.key}
          classNames={{
            base: cn(
              {
                "h-auto p-0": !isCompact && isNestType,
              },
              {
                "inline-block w-11": isCompact && isNestType,
              },
            ),
          }}
          endContent={isCompact || isNestType || hideEndContent ? null : (item.endContent ?? null)}
          startContent={renderStartContent(item)}
          title={isCompact || isNestType ? null : item.title}
        >
          {isCompact ? (
            <Tooltip content={item.title} placement="right">
              <div className="flex w-full items-center justify-center">
                {item.icon ? (
                  <Icon
                    className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)}
                    icon={item.icon}
                    width={24}
                  />
                ) : (
                  (item.startContent ?? null)
                )}
              </div>
            </Tooltip>
          ) : null}
          {!isCompact && isNestType ? (
            <Accordion className={"p-0"}>
              <AccordionItem
                key={item.key}
                aria-label={item.title}
                classNames={{
                  heading: "pr-3",
                  trigger: "p-0",
                  content: "py-0 pl-4",
                }}
                title={
                  item.icon ? (
                    <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                      <Icon
                        className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)}
                        icon={item.icon}
                        width={24}
                      />
                      <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                        {item.title}
                      </span>
                    </div>
                  ) : (
                    (item.startContent ?? null)
                  )
                }
              >
                {item.items && item.items?.length > 0 ? (
                  <Listbox
                    aria-label="Sidebar Listbox"
                    className={"mt-0.5"}
                    classNames={{
                      list: cn("border-l border-default-200 pl-4"),
                    }}
                    items={item.items}
                    variant="flat"
                  >
                    {item.items.map(renderItem)}
                  </Listbox>
                ) : (
                  renderItem(item)
                )}
              </AccordionItem>
            </Accordion>
          ) : null}
        </ListboxItem>
      );
    },
    [isCompact, hideEndContent, iconClassName, items],
  );

  const renderItem = useRenderItem(isCompact, iconClassName, hideEndContent, renderStartContent, renderNestItem);
  const renderListBoxItems = useRenderListBoxItems(renderNestItem, renderItem, isCompact, sectionClasses);

  return { items, itemClasses, renderListBoxItems, selected, setSelected };
}

function useSidebarClasses(sectionClassesProp: SectionClassesType, itemClassesProp: ItemClassesType) {
  const isCompact = useMediaQuery("(max-width: 768px)");

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

  return { sectionClasses, itemClasses };
}

function useSetSelectedSideBarItem({ defaultSelectedKey }: SidebarProps) {
  const currentPath = usePathname()?.split("/")?.[1];
  const [selected, setSelected] = React.useState<React.Key>(currentPath ?? defaultSelectedKey);

  React.useEffect(() => {
    // Ensure the selected state is consistent on the client side
    setSelected(currentPath ?? defaultSelectedKey);
  }, [currentPath, defaultSelectedKey]);

  return { selected, setSelected };
}

function useRenderItem(
  isCompact: boolean,
  iconClassName: string | undefined,
  hideEndContent: boolean | undefined,
  renderStartContent: (item: SidebarItem) => React.ReactNode,
  renderNestItem: (item: SidebarItem) => React.JSX.Element,
) {
  return function RenderItem(item: Readonly<SidebarItem>) {
    const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

    if (isNestType) {
      return renderNestItem(item);
    }

    return (
      <ListboxItem
        aria-label="Sidebar ListboxItem"
        {...item}
        key={item.key}
        endContent={isCompact || hideEndContent ? null : (item.endContent ?? null)}
        startContent={renderStartContent(item)}
        textValue={item.title}
        title={isCompact ? null : item.title}
      >
        {isCompact ? (
          <Tooltip content={item.title} placement="right">
            <div className="flex w-full items-center justify-center">
              {item.icon ? (
                <Icon
                  className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                (item.startContent ?? null)
              )}
            </div>
          </Tooltip>
        ) : null}
      </ListboxItem>
    );
  };
}

function useRenderListBoxItems(
  renderNestItem: (item: SidebarItem) => React.JSX.Element,
  renderItem: (item: SidebarItem) => React.JSX.Element,
  isCompact: boolean,
  sectionClasses: SectionClassesType,
) {
  return function RenderListBoxItems(item: SidebarItem) {
    if (item.items && item.items?.length > 0) {
      if (item?.type === SidebarItemType.Nest) {
        return renderNestItem(item);
      } else {
        return (
          <ListboxSection key={item.key} classNames={sectionClasses} showDivider={isCompact} title={item.title}>
            {item.items.map(renderItem)}
          </ListboxSection>
        );
      }
    }

    return renderItem(item);
  };
}

function useRenderStartContent(isCompact: boolean, iconClassName: string | undefined) {
  const currentPath = usePathname()?.split("/")?.[1];

  return function RenderStartContent(item: SidebarItem) {
    if (isCompact) {
      return null;
    }
    const icon = (currentPath === item.key ? item.iconSelected : item.icon) ?? item.icon;

    return item.icon ? (
      <Icon
        className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)}
        icon={icon as string | IconifyIcon}
        width={24}
      />
    ) : (
      (item.startContent ?? null)
    );
  };
}
