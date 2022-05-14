import React, {useState, } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

import {
  IconButton,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';

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
    opacity: "0.4"
  },
  menuIcon: {
    color: '#01a22e'
  }
};


export default function Header({ onMenuClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.menuIconContainer}>
          <ThemeProvider theme={theme}>
            <IconButton  onClick={() => onMenuClick()}  color="primary">
              <MenuIcon  />  
            </IconButton>
          </ThemeProvider>
        </div>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image alt="logo" src="/logo-green.png" width={123} height={28} />
            </a>
          </Link>
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
          {/* <ThemeProvider theme={theme}>
            <Button
              href="https://play.google.com/store/apps/details?id=com.healer.nature"
              size="small"
              color="primary"
              variant="outlined">
              Download App
            </Button>
          </ThemeProvider> */}
        </nav>
      </div>
      <div className={styles.divider}>
        <Divider />
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.bottom__location}>
          <LocationOnIcon sx={muiStyles.icon} />
          <Typography>City</Typography>
        </div>
        <div className={styles.bottom__navLinks}>
          <Link href='/doctors'>
            Doctors
          </Link>
          <Link href='/'>
            Order medicine
          </Link>
          <Link href='/'>
            Brands
          </Link>
          <Link href='/'>
            Health Feed
          </Link>
        </div>
        <div>
          <Typography variant="body2">
            LogIn/SignUp
          </Typography>
        </div>
      </div>
    </header>
  );
}
