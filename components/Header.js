import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  IconButton,
  Divider,
  Typography,
  Menu,
  Box,
  Button,
  Icon,
} from "@mui/material";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

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
    marginBottom: "0.18rem",
  },
};

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image alt="logo" src="/healer_web.png" width={110} height={30} />
            </a>
          </Link>
        </div>
        <div>
          <div className={styles.navSearch}></div>
        </div>
        <nav className={styles.navLinks}>
          <ul>
            <li>
              <Link href="/cart" passHref>
                <div>
                  <ThemeProvider theme={theme}>
                    <IconButton color="primary">
                      <ShoppingCartIcon />
                    </IconButton>
                  </ThemeProvider>
                </div>
              </Link>
            </li>
            <li>
              <ThemeProvider theme={theme}>
                <Button
                  href="https://play.google.com/store/apps/details?id=com.healer.nature"
                  size="medium"
                  className={styles.btn}
                  color="primary"
                  variant="outlined">
                  Download App
                </Button>
              </ThemeProvider>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.headerBottom}>
        <div>Lahore</div>
        <Divider sx={{ marginLeft: "5px" }} orientation="vertical" />
        <div className={styles.scrollable}>
          <div className={styles.menuChipContainer}>
            <Typography sx={muiStyles.text} variant="caption">
              Unani Physician
            </Typography>
          </div>
          <div className={styles.menuChipContainer}>
            <SimpleMenu />
          </div>
          <div className={styles.menuChipContainer}>
            <Typography sx={muiStyles.text} variant="caption">
              Order Medicine
            </Typography>
          </div>
        </div>
        <Divider sx={{ marginRight: "5px" }} orientation="vertical" />
        <div>
          <Typography variant="caption">logIn/signUp</Typography>
        </div>
      </div>
    </header>
  );
}

function SimpleMenu(name, list, routing) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setClicked(false);
  }

  return (
    <div>
      <Box
        sx={muiStyles.clickable}
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        // onMouseEnter={handleClick}
      >
        Brands{" "}
        <Icon>
          {clicked ? (
            <KeyboardArrowUpIcon sx={muiStyles.icon} />
          ) : (
            <KeyboardArrowDownIcon sx={muiStyles.icon} />
          )}
        </Icon>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}>
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <Button onClick={handleClose} size="small">
          Mani
        </Button>
        <Button onClick={handleClose} size="small">
          Usama
        </Button>
        <Button onClick={handleClose} size="small">
          hello
        </Button>
        <Button onClick={handleClose} size="small">
          nothing
        </Button>
        <Button onClick={handleClose} size="small">
          All
        </Button>
      </Menu>
    </div>
  );
}
