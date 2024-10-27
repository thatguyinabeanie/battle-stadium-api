import { ConfigTheme } from "@/components/nextui/client-components";
import { CommonTheme } from "./common";

const DarkPurple: ConfigTheme = {
  ...CommonTheme,
  extend: "dark",
  colors: {
    background: "#0D001A",
    foreground: "#ffffff",
    primary: {
      50: "#3B096C",
      100: "#520F83",
      200: "#7318A2",
      300: "#9823C2",
      400: "#c031e2",
      500: "#DD62ED",
      600: "#F182F6",
      700: "#FCADF9",
      800: "#FDD5F9",
      900: "#FEECFE",
      DEFAULT: "#DD62ED",
      foreground: "#ffffff",
    },
    focus: "#F182F6",
  },
};

export default DarkPurple;
