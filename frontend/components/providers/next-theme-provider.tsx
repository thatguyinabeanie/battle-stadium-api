import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { ChildrenProps } from "@/types";

export interface ProvidersProps extends ChildrenProps {
  themeProps?: ThemeProviderProps;
}

export default function NextThemesProvider({
  children,
  themeProps,
}: Readonly<ProvidersProps>) {
  return <ThemeProvider {...themeProps}>{children}</ThemeProvider>;
}
