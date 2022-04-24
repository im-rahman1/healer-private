import React from "react";
import "@/styles/globals.css";
import Script from "next/script";
import { TAGM_ID } from "@/config/config";
import TagManager from "react-gtm-module";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    TagManager.initialize({ gtmId: TAGM_ID });
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
