import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/layout.module.css";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <link
          rel="shortcut icon"
          href="/healer_favicon.png"
          type="image/x-icon"
        />
        <title>{title}</title>
        <meta name={description} content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Healer",
  description: "Get online prescription",
  keywords: "physician, consultation, medicine, drugs",
};
