import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

import {
  IconButton,
  Divider,
  Typography,
  Button,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/config/firebase";
import firebase from "firebase/app";
import { useUserAuth } from "context/authContext";

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

  const { user, logOut } = useUserAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const [uName, setUName] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!user) {
      const unsubscribe = firebase.auth().onAuthStateChanged((cuser) => {
        // console.log(cuser);
        setCurrentUser(cuser);
        setUName(
          String(localStorage.getItem("proactiveRefresh_n"))
            .split("")
            .reverse()
            .join("")
        );
      });

      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(currentUser);

  return (
    <header className={styles.header}>
      <ThemeProvider theme={theme}>
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
                  <Image
                    alt="logo"
                    src="/logo-green.png"
                    width={123}
                    height={28}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.dvdr}>
              <Divider sx={{ height: "40px" }} orientation="vertical" />
            </div>
            <div className={styles.logoLinks}>
              <div
                className={
                  router.pathname == "/"
                    ? styles.highlightedLink
                    : styles.simpleLink
                }>
                <Link href="/" passHref>
                  <Typography>Home</Typography>
                </Link>
              </div>
              <div
                className={
                  router.pathname.includes("doctors")
                    ? styles.highlightedLink
                    : styles.simpleLink
                }>
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
            {/* <Link href="/cart" passHref>
              <div>
                <IconButton color="primary">
                  <ShoppingCartIcon />
                </IconButton>
              </div>
            </Link> */}
            <div className="divv" style={{ width: "2rem" }}></div>
            {currentUser ? (
              <div className={styles.toolTip}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}>
                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(5px)",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        // bgcolor: "rgba(255, 255, 255, 0.8)",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                  <MenuItem>
                    <Avatar /> {uName}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => logOut()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Link href="/logIn" passHref>
                  <div>
                    <Button size="small" variant="outlined">
                      LogIn
                    </Button>
                  </div>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </ThemeProvider>
    </header>
  );
}
