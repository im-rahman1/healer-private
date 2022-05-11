import React, {useState} from 'react';
import Head from "next/head";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/layout.module.css";

import {
  IconButton,
  Drawer,
  Box
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

const drawerWidth = 220;

export default function Layout({
  title,
  keywords,
  author,
  description,
  children,
  addProductJson,
  window
}) {

  const [showSideBar, setShowSideBar] = useState(false);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  const drawer = (
    <div>
      <div className={styles.logoContainer}>
          <div className={styles.sideBarMenuIcon}>
            <IconButton
              onClick={handleSideBar}
              sx={{
                color: "#01a22e",
              }}>
              <MenuIcon />
            </IconButton>
          </div>
          <div className={styles.logo}>
            <Image alt="logo" src="/healer_web.png" width={118} height={32} />
          </div>
        </div>
    </div>
  );

  const container =
  window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Head>
        <link
          rel="shortcut icon"
          href="/healer_favicon.png"
          type="image/x-icon"
        />
        <title>{title}</title>
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
      <Header  onMenuClick={handleSideBar} />
        <Box
          className={styles.drawer}
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
          <Drawer
            container={container}
            variant="temporary"
            open={showSideBar}
            onClose={handleSideBar}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </Box>
      <Box component="main" className={styles.container}>
        <div>{children}</div>
      </Box>
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
