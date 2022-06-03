import React from "react";
import "@/styles/globals.css";
import TagManager from "react-gtm-module";
import { UserAuthContextProvider } from "context/authContext";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-PHR8S46" });
  }, []);

  return (
    <>
      <UserAuthContextProvider>
        <Component {...pageProps} />
      </UserAuthContextProvider>
    </>
  );
}

export default MyApp;
