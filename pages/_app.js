import "@/styles/globals.css";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/config/config";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', "${GA_MEASUREMENT_ID}", {
            page_path: window.location.pathname
          });
        `}
      </Script>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
