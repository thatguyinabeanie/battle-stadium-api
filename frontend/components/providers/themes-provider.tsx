import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps extends ThemeProviderProps {
  children: ReactNode;
}

export default function ThemesProvider({ children, ...rest }: Readonly<ProvidersProps>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="purple-dark" {...rest}>
      {children}
    </NextThemesProvider>
  );
}
