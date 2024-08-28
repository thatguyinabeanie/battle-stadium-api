import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemesProvider({ children, ...rest }: Readonly<ProvidersProps>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" {...rest}>
      {children}
    </NextThemesProvider>
  );
}
