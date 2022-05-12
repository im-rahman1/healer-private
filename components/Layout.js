import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/layout.module.css";
import { useRouter } from "next/router";

import {
  Drawer,
  Box,
  Avatar,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

const drawerWidth = 260;

const muiStyles = {
  avatar: {
    width: "5rem",
    height: "5rem",
  },
  closeBtn: {
    padding: "5px 0",
    width: '20px'
  }
};

export default function Layout({
  title,
  keywords,
  author,
  description,
  children,
  addProductJson,
  window,
}) {
  const router = useRouter();
  const [showSideBar, setShowSideBar] = useState(false);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  };

  const drawer = (
    <div className={styles.drawer}>
      <div className={styles.sideBarCloseIcon}>
        <ThemeProvider theme={theme}>
          <IconButton color="white" onClick={handleSideBar}>
            <CloseIcon sx={{fontSize: '28px'}} />
          </IconButton>
        </ThemeProvider>
      </div>
      <div className={styles.info}>
        <Avatar sx={muiStyles.avatar} />
        <Typography sx={{color: '#fff'}}>Mani ch</Typography>
      </div>
      <ThemeProvider theme={theme}>
        <List sx={{ padding: 0 }}>
          <Link href="/" passHref>
            <ListItem
              button={router.pathname == "/" ? false : true}
              sx={
                router.pathname == '/'
                  ? { backgroundColor: "#01a22f23", cursor: "pointer" }
                  : { cursor: "pointer" }
              }>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText className={styles.listItemText}>
                Home
              </ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link href="/doctors" passHref>
            <ListItem
              button={router.pathname == "/doctors" ? false : true}
              sx={
                router.pathname.includes("doctors")
                  ? { backgroundColor: "#01a22f23", cursor: "pointer" }
                  : { cursor: "pointer" }
              }>
              <ListItemIcon>
                <MedicalServicesIcon color="primary" />
              </ListItemIcon>
              <ListItemText className={styles.listItemText}>
                Doctors
              </ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link href="https://healer.pk/health-feed" passHref>
            <ListItem
              button={router.pathname == "/health-feed" ? false : true}
              sx={
                router.pathname.includes("health-feed")
                  ? { backgroundColor: "#01a22f23", cursor: "pointer" }
                  : { cursor: "pointer" }
              }>
              <ListItemIcon>
                <HealthAndSafetyIcon color="primary" />
              </ListItemIcon>
              <ListItemText className={styles.listItemText}>
                Health Feed
              </ListItemText>
            </ListItem>
          </Link>
        </List>
      </ThemeProvider>
      {/* <div>
        <Typography sx={{ color: "#01a22e" }}>Log Out</Typography>
      </div> */}
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
      <Header onMenuClick={handleSideBar} />
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
            display: { xs: "block", sm: "block", md: "none" },
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
