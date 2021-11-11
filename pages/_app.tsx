import type { AppProps } from "next/app";

// leave as in most likely
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
