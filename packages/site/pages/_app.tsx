import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="reactjobs.com">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
