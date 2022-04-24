import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/layout.module.css";

export default function Layout({
  title,
  keywords,
  author,
  description,
  children,
  addProductJson,
  addTagManagerScript,
}) {
  return (
    <div>
      <Head>
        <link
          rel="shortcut icon"
          href="/healer_favicon.png"
          type="image/x-icon"
        />
        <title>{title}</title>
        {/* <script
          dangerouslySetInnerHTML={addTagManagerScript}
          key="tag-manager"
        /> */}
        {keywords && <meta name="keywords" content={keywords} />}
        {description && <meta name="description" content={description} />}
        {author && <meta name="author" content={author} />}
        {addProductJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addProductJson}
            key="product-jsonld"
          />
        )}
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Healer",
  description:
    "Find, book and consult online with top qualified Hakeem, Order Herbal Unani Medicines online.",
  keywords: "physician, consultation, medicine, drugs",
};
