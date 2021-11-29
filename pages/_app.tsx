import "@lib/utils/log";
import "@fontsource/nunito";
import "@styles/global.css";
import { Wrapper } from "@components/Wrapper";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@styles/theme";
import { useMqttState } from "mqtt-react-hooks";
import { MqttConnector } from "@components/MqttConnector";

// leave as is most likely
const MyApp = ({ Component, pageProps }: AppProps) => {
  const state = useMqttState();
  log(state);
  //log(pageProps);
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <MqttConnector>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </MqttConnector>
    </ChakraProvider>
  );
};

export default MyApp;
