import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

import { IconButton, Divider, Typography, Button } from "@mui/material";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";

const muiStyles = {
  text: {
    color: "#01a22e",
    whiteSpace: "noWrap",
  },
  clickable: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "#01a22e",
    fontSize: "13px",
  },
  icon: {
    fontSize: "20px",
    opacity: "0.4",
  },
  menuIcon: {
    color: "#01a22e",
  },
};

export default function Header({ onMenuClick }) {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.menuIconContainer}>
          <ThemeProvider theme={theme}>
            <IconButton onClick={() => onMenuClick()} color="primary">
              <MenuIcon />
            </IconButton>
          </ThemeProvider>
        </div>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image alt="logo" src="/logo-green.png" width={123} height={28} />
              </a>
            </Link>
          </div>
          <div className={styles.dvdr}>
            <Divider  sx={{ height: "40px" }} orientation="vertical" />
          </div>
          <div className={styles.logoLinks}>
            <div className={router.pathname == '/' ? styles.highlightedLink : styles.simpleLink}>
              <Link href="/" passHref>
                  <Typography>Home</Typography>
              </Link>
            </div>
            <div  className={router.pathname == '/doctors' ? styles.highlightedLink : styles.simpleLink}>
              <Link href="/doctors" passHref>
                <Typography>Doctors</Typography>
              </Link>
            </div>
            <div className={styles.simpleLink}>
              <Link href="https://healer.pk/health-feed" passHref>
                <Typography>Health Feed</Typography>
              </Link>
            </div>
          </div>
        </div>
        <nav className={styles.navLinks}>
          <Link href="/cart" passHref>
            <div>
              <ThemeProvider theme={theme}>
                <IconButton color="primary">
                  <ShoppingCartIcon />
                </IconButton>
              </ThemeProvider>
            </div>
          </Link>
          <div className={styles.logInBtn}>
            <ThemeProvider theme={theme}>
              <Button variant="outlined" size="small" color="primary">LogIn/SignUp</Button>
            </ThemeProvider>
          </div>
        </nav>
      </div>
    </header>
  );
}
