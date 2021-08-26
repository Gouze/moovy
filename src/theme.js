import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    gray: {
      100: "#53535f",
      200: "#494955",
      300: "#3f3f4b",
      400: "#353541",
      500: "#2b2b37",
      600: "#21212d",
      700: "#171723",
      800: "#0d0d19",
      900: "#03030f",
    },
    red: {
      50: "#ff798d",
      100: "#ff6f83",
      200: "#ff6579",
      300: "#ff5b6f",
      400: "#f75165",
      500: "#ed475b",
      600: "#e33d51",
      700: "#d93347",
      800: "#cf293d",
      900: "#c51f33",
    },
  },
  styles: {
    global: {
      body: {},
    },
  },
  fonts: {
    heading: "Sora",
    body: "Sora",
  },
  config,
});
export default theme;
