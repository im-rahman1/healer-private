import Image from "next/image";
import styles from "@/styles/common/productCard.module.css";
import { Typography, Button } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";

export default function ProductCard(
  img,
  ProductName,
  type,
  qualification,
  experience
) {
  return (
    <div className={styles.product}>
      <div className={styles.flex}>
        <Typography variant="caption">Khameera</Typography>
        <span className={styles.discountBadge}>
          <Typography variant="caption">15% OFF</Typography>
        </span>
      </div>
      <div className={styles.product__img}>
        <Image
          priority
          className={styles.image}
          alt="banner"
          src="/khameera.webp"
          layout="fill"
        />
      </div>
      <div>
        <Typography>Khameera Gaozuban</Typography>
        <div className={styles.flex}>
          <Typography sx={{ opacity: 0.8 }} variant="body2">
            Hamdard
          </Typography>
          <Typography sx={{ opacity: 0.7 }} variant="caption">
            100g
          </Typography>
        </div>
        <div className={styles.product__price}>
          <Typography sx={{ color: "#01a22e" }} variant="body2">
            PKR 160
          </Typography>
          <Typography sx={{ opacity: 0.5 }}>•</Typography>
          <Typography
            sx={{ color: "red", textDecoration: "line-through" }}
            variant="caption">
            PKR 160
          </Typography>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <Button sx={{ marginTop: "10px" }} variant="contained" size="small">
          Add To Cart
        </Button>
      </ThemeProvider>
    </div>
  );
}
