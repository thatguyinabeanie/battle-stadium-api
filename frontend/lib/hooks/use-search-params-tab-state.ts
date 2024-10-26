import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

export function useSearchParamsTabState(tabs: string[], defaultTab: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabStr = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState((tabs.includes(`${tabStr}`) && tabStr) || defaultTab);

  const updateSearchParams = React.useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  return { activeTab, setActiveTab, updateSearchParams };
}
