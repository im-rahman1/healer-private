import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/common/productCard.module.css";

import { Typography, Button, Select, MenuItem } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { Box } from "@mui/system";

export default function ProductCard(pro) {
  const product = pro.product;
  // console.log(product);

  const firstVariant = product.perUnitPrice[0];

  const [productVariant, setProductVariant] = useState({ ...firstVariant });

  const discountPrice = (price, discount) => {
    // console.log(price);
    return price - (price * discount) / 100;
  };

  const muiStyles = {
    img: {
      width: "60%",
      height: "85%",
      margin: "15px 10px 0px 10px",
    },
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    const filtered = product.perUnitPrice.filter(
      (unit) => unit.number == event.target.value
    );
    setProductVariant(filtered[0]);
  };

  // console.log(productVariant);

  return (
    <div className={styles.product}>
      <div className={styles.flex}>
        <Typography variant="caption">{product.category}</Typography>
        <span className={styles.discountBadge}>
          <Typography variant="caption">
            {productVariant.discount}% OFF
          </Typography>
        </span>
      </div>
      <div className={styles.product__img}>
        <Box
          sx={muiStyles.img}
          component="img"
          alt={`${product.productName}Image`}
          src={product.image}
        />
        <Image
          priority
          className={styles.image}
          alt="banner"
          // src="/khameera.webp"
          src={"/products.healer.pk/Sharbat%20Toot%20Siah%20Qarshi.png"}
          layout="fill"
        />
      </div>
      <div>
        <Typography>{product.productName}</Typography>
        <div className={styles.flex}>
          <Typography sx={{ opacity: 0.8 }} variant="body2">
            {product.brand}
          </Typography>
          <Typography sx={{ opacity: 0.7 }} variant="caption">
            {productVariant.number}
            {product.unit}
          </Typography>
        </div>
        <div className={styles.product__price}>
          <Typography sx={{ color: "#01a22e" }} variant="body2">
            PKR {discountPrice(productVariant.price, productVariant.discount)}
          </Typography>
          <Typography sx={{ opacity: 0.3 }}>•</Typography>
          <Typography
            sx={{ color: "red", textDecoration: "line-through" }}
            variant="caption">
            PKR {productVariant.price}
          </Typography>
        </div>
      </div>
      {product.perUnitPrice.length > 0 && (
        <ThemeProvider theme={theme}>
          <Select
            size="small"
            value={productVariant.number}
            onChange={handleChange}>
            {product.perUnitPrice.map((variant, i) => (
              <MenuItem
                // sx={{ minWidth: "300px", height: "50px" }}
                value={variant.number}
                key={variant.number}>
                {variant.number}
                {product.unit}
              </MenuItem>
            ))}
          </Select>
        </ThemeProvider>
      )}
      <ThemeProvider theme={theme}>
        <Button sx={{ marginTop: "10px" }} variant="contained" size="small">
          Add To Cart
        </Button>
      </ThemeProvider>
    </div>
  );
}
