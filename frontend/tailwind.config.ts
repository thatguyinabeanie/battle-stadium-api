import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";
import DarkPurple from "./lib/tailwindcss/themes/dark-purple";
import LightPurple from "./lib/tailwindcss/themes/light-purple";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui({
      themes: {
        "purple-dark": DarkPurple,
        "light-purple": LightPurple,
      },
    }),
  ],
};

export default config;
