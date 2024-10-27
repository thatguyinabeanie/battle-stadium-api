import { useState, useCallback } from "react";

import { useSearchParams, useRouter } from "next/navigation";

export function useSearchParamsTabState(tabs: string[], defaultTab: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabStr = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState((tabs.includes(`${tabStr}`) && tabStr) || defaultTab);

  const updateSearchParams = useCallback(
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
