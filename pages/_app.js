import "@/styles/globals.css";
import Script from "next/script";
import { TAGM_ID } from "@/config/config";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${TAGM_ID}`}
          height="0"
          width="0"
          styles="display:none;visibility:hidden"></iframe>
      </noscript> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
