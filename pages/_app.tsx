import "@lib/utils/log";
import "@fontsource/nunito";
import "@styles/global.css";
import { Wrapper } from "@components/Wrapper";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import { theme } from "@styles/theme";
import { Connector } from "mqtt-react-hooks";

// leave as is most likely
const MyApp = ({ Component, pageProps }: AppProps) => {
  //log(pageProps);
  return (
    <ChakraProvider theme={theme}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ChakraProvider>
  );
};

export default MyApp;
