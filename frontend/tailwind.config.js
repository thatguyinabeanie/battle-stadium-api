import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|breadcrumbs|button|checkbox|code|date-picker|input|kbd|link|listbox|navbar|select|snippet|toggle|table|ripple|spinner|calendar|date-input|popover|divider|scroll-shadow|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "",
  plugins: [nextui()],
};
