import Image from "next/image";
import Link from "next/link";
import styles from "../styles/footer.module.css";
import { Typography } from "@mui/material";
import playStore from "../public/playStore.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerElement1}>
        <div className={styles.footerDownloadApp}>
          <Typography variant="subtitle1">Download Our App</Typography>
          <div className={styles.playstoreBtn}>
            <a href="https://play.google.com/store/apps/details?id=com.healer.nature">
              <Image src={playStore} alt="get it on playstore" />
            </a>
          </div>
        </div>
        <div className={styles.followUs}>
          <Typography variant="subtitle1">Follow Us</Typography>
          <div className={styles.SocialMedia__links}>
            <a
              href="https://www.facebook.com/healercare"
              target="_blank"
              rel="noreferrer">
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/healercare"
              target="_blank"
              rel="noreferrer">
              <InstagramIcon />
            </a>
            <a
              href="https://www.youtube.com/c/healercare"
              target="_blank"
              rel="noreferrer">
              <YouTubeIcon />
            </a>
            <a
              href="https://www.twitter.com/healercare"
              target="_blank"
              rel="noreferrer">
              <TwitterIcon />
            </a>
          </div>
        </div>
        <div className={styles.footerElement1Links}>
          <Typography variant="subtitle1">Healer</Typography>
          <Link href="/about">About us</Link>
          <br />
          <Link href="/contact">Contact us</Link>
          <br />
          <Link href="/privacy-policy">Privacy Policy</Link>
          <br />
          <Link href="/terms-conditions">Terms & Conditions</Link>
        </div>
      </div>
      <div className={styles.footerElement2}>
        <Image src="/healer_web_white.png" alt="Logo" width={145} height={40} />
        <Typography variant="body2" className={styles.footerHeading}>
          2022 Healer.pk All rights reserved
        </Typography>
      </div>
    </div>
  );
}
