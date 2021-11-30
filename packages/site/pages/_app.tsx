import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import Layout from "../components/Layout";
import SEO from "../next-seo.config";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  Modal.setAppElement("#__next");

  return (
    <PlausibleProvider domain="react-jobs.io">
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
