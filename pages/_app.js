import React from "react";
import "@/styles/globals.css";
import TagManager from "react-gtm-module";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-PHR8S46" });
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
