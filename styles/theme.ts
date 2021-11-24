import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  ...config,
  fonts: {
    header: "Nunito",
    h1: "Nunito",
    h2: "Nunito",
    h3: "Nunito",
    h4: "Nunito",
    h5: "Nunito",
    a: "Nunito",
  },
});
