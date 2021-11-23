import "@fontsource/nunito";
import "@styles/global.css"
import { Wrapper } from "@components/Wrapper";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import { theme } from "@styles/theme"

// leave as in most likely
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ChakraProvider>
  );
};

export default MyApp;
