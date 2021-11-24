import "@lib/utils/log";
import "@fontsource/nunito";
import "@styles/global.css";
import { Wrapper } from "@components/Wrapper";
import type { AppProps } from "next/app";
import { Center, ChakraProvider, Spacer } from "@chakra-ui/react";
import { theme } from "@styles/theme";
import { Connector } from "mqtt-react-hooks";
import { Flex } from "@chakra-ui/react";
import { Header } from "@components/Header";
import Footer from "@components/Footer";

// leave as is most likely
const MyApp = ({ Component, pageProps }: AppProps) => {
  //log(pageProps);
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Connector brokerUrl={process.env.BROKER_URI}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </Connector>
    </ChakraProvider>
  );
};

export default MyApp;
