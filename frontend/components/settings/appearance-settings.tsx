"use client";

import { forwardRef } from "react";
import { RadioGroup, Select, SelectItem, Spacer } from "~/components/nextui/client-components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { ThemeCustomRadio } from "~/components/settings/theme-custom-radio";
import { cn } from "~/lib/utils";

interface AppearanceSettingCardProps {
  className?: string;
}

const fontSizeOptions = [
  { label: "Small", value: "small", description: "font size 14px" },
  { label: "Medium", value: "medium", description: "font size 16px" },
  { label: "Large", value: "large", description: "font size 18px" },
];

const AppearanceSetting = forwardRef<HTMLDivElement, AppearanceSettingCardProps>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div ref={ref} className={cn("p-2", className)} {...props}>
      {/* Theme */}
      <div>
        <p className="text-base font-medium text-default-700">Theme</p>
        <p className="mt-1 text-sm font-normal text-default-400">Change the appearance of the web.</p>
        {/* Theme radio group */}
        <RadioGroup className="mt-4 flex-wrap" orientation="horizontal" value={theme} onValueChange={setTheme}>
          <ThemeCustomRadio value="light" variant="light">
            Light
          </ThemeCustomRadio>

          <ThemeCustomRadio value="dark" variant="dark">
            Dark
          </ThemeCustomRadio>
        </RadioGroup>
      </div>
      <Spacer y={4} />
      {/* Font size */}
      <div className="flex items-start justify-between gap-2 py-2">
        <div>
          <p className="text-base font-medium text-default-700">Font size</p>
          <p className="mt-1 text-sm font-normal text-default-400">Adjust the web font size.</p>
        </div>
        <Select aria-label="select font size" className="max-w-[200px]" defaultSelectedKeys={["large"]}>
          {fontSizeOptions.map((fontSizeOption) => (
            <SelectItem key={fontSizeOption.value} value={fontSizeOption.value}>
              {fontSizeOption.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Spacer y={4} />
    </div>
  );
});

AppearanceSetting.displayName = "AppearanceSetting";

export default AppearanceSetting;
