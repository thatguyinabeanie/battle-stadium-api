import { ListboxItem, Tooltip, Accordion, AccordionItem, Listbox } from "@nextui-org/react";
import React from "react";

import { Icon } from "../client";

import { ItemClassesType, SidebarItem, SidebarItemType } from "./sidebar";
import useSideBarItems from "./useSideBarItems";

import { cn } from "@/lib/utils";

export interface RenderSideBarItemsProps {
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  itemClasses?: ItemClassesType;
}

export default function useRenderSideBarItems({
  isCompact,
  hideEndContent,
  iconClassName,
  itemClasses,
}: RenderSideBarItemsProps) {
  const items = useSideBarItems();

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
          startContent={
            isCompact || isNestType ? null : item.icon ? (
              <Icon
                className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)}
                icon={item.icon}
                width={24}
              />
            ) : (
              (item.startContent ?? null)
            )
          }
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

  const renderItem = React.useCallback(
    (item: SidebarItem) => {
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
          startContent={
            isCompact ? null : item.icon ? (
              <Icon
                className={cn("text-default-500 group-data-[selected=true]:text-foreground", iconClassName)}
                icon={item.icon}
                width={24}
              />
            ) : (
              (item.startContent ?? null)
            )
          }
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
    },
    [isCompact, hideEndContent, iconClassName, itemClasses?.base],
  );

  return { renderItem, renderNestItem, items };
}
