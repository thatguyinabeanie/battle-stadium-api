import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { ChildrenProps } from "@/types";

export interface ProvidersProps extends ChildrenProps {
  themeProps?: ThemeProviderProps;
}

export default function ThemesProvider({
  children,
  themeProps,
}: Readonly<ProvidersProps>) {
  return <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>;
}
