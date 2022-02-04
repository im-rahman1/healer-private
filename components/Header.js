import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";
import { theme } from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";

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
      <nav className={styles.navLinks}>
        <ul>
          <li>
            <ThemeProvider theme={theme}>
              <Link className={styles.btn} href="https://healer.pk/health-feed">
                <a>
                  <Button size="small">Health Feed</Button>
                </a>
              </Link>
            </ThemeProvider>
          </li>
          <li>
            <ThemeProvider theme={theme}>
              <Button
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
