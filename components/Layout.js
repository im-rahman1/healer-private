import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/layout.module.css";
import { useRouter } from "next/router";
import playStore from "../public/playStore.png";
import { auth } from "@/config/firebase";

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
  CssBaseline,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

import { useUserAuth } from "context/authContext";
import { onAuthStateChanged } from "firebase/auth";

const drawerWidth = 280;

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
  const { user, logOut, sendUser } = useUserAuth();
  const [usser, setUsser] = useState(null);
  const [uName, setUName] = useState("user");
  const [showSideBar, setShowSideBar] = useState(false);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
    // console.log(showSideBar);
  };

  useEffect(() => {
    if(!usser) {
      const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        // console.log(currentuser);
          setUsser(currentuser);
      });

      
      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    setUName(String(localStorage.getItem("proactiveRefresh_n")).split("").reverse().join(""))

  }, [user])


  const drawer = (
    <div className={styles.drawer}>
      <ThemeProvider theme={theme}>
      <div>
        <div className={styles.sideBarCloseIcon}>
          <ThemeProvider theme={theme}>
            <IconButton color="white" onClick={handleSideBar}>
              <CloseIcon sx={{fontSize: '28px'}} />
            </IconButton>
          </ThemeProvider>
        </div>
        <div>
          {
            usser ? (
              <div className={styles.info}>
                <Avatar sx={muiStyles.avatar} src={usser.photoURL || ""} />
                <Typography sx={{color: '#fff'}}>{uName}</Typography>
                <Typography sx={{color: '#fff'}} variant="caption">{usser.phoneNumber || " "}</Typography>
              </div>
            ) : (
              <div>
                <Link href="/logIn" passHref>
                  <div className={styles.info}>
                    <Avatar sx={muiStyles.avatar}/>
                    <Typography sx={{color: '#fff', cursor: 'pointer'}}>LogIn</Typography>
                  </div>
                </Link>
              </div>
            )
          }
        </div>
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
      </div>
      <div>
        {
          usser && (
            <div className={styles.logoutBtn}>
              <Button size="small" onClick={() => logOut()}>Log Out</Button>
            </div>
          )
        }
        <div className={styles.downloadNowContainer}>
            <Typography variant="caption">Download Healer App</Typography>
            <div className={styles.playstoreBtn}>
                <a href="https://play.google.com/store/apps/details?id=com.healer.nature">
                  <Image src={playStore} alt="get it on playstore" />
                </a>
              </div>
        </div>
      </div>
      </ThemeProvider>
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
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" className={styles.container}>
        <div>{children}</div>
      </Box>
      {/* <Button onClick={() => sendUser()}>send User</Button> */}
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
