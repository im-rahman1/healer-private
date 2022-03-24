import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function Header() {
  return (
    <header className={styles.header}>
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
    </header>
  );
}
