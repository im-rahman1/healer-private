import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

import { Avatar, Typography, Divider } from "@mui/material";

export default function Home() {
  const brands = [
    { img: "/brandsIcons/Lasani.jpeg", name: "Lasani" },
    { img: "/brandsIcons/Ajmal.png", name: "Ajmal" },
    { img: "/brandsIcons/Aftab Qarshi.png", name: "Aftab Qarshi" },
    { img: "/brandsIcons/Ashraf.png", name: "Ashraf" },
    { img: "/brandsIcons/Brick.jpeg", name: "Brick" },
    { img: "/brandsIcons/Hamdard.jpeg", name: "Hamdard" },
    { img: "/brandsIcons/Marhaba.png", name: "Marhaba" },
    { img: "/brandsIcons/Qarshi.png", name: "Qarshi" },
    { img: "/brandsIcons/Tayyebi.png", name: "Tayyebi" },
    { img: "/brandsIcons/TT.jpeg", name: "TT" },
  ];

  const [shuffledArray, setShuffledArray] = useState([]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setShuffledArray(array);
  }

  // console.log(shuffledArray);

  useEffect(() => {
    shuffle(brands);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className={styles.bannerContainer}>
        <Image
          priority
          className={styles.image}
          alt="banner"
          src="/banners.jpeg"
          layout="fill"
        />
      </div>
      <Typography sx={{ margin: "20px 0 0 10px" }} variant="h5">
        Top Brands
      </Typography>
      <Typography sx={{ marginLeft: "12px", opacity: "0.7" }} variant="body2">
        Order Medicines Of Top Brands
      </Typography>
      <div className={styles.topBrands}>
        {shuffledArray.map((brand) => (
          <div className={styles.brandCard} key={brand.name}>
            <div className={styles.avatar}>
              <div className={styles.avatar__img}>
                <Image
                  src={brand.img}
                  alt={brand.name}
                  width="65px"
                  height="45px"
                />
              </div>
            </div>
            <Typography sx={{ opacity: "0.8" }}>{brand.name}</Typography>
          </div>
        ))}
      </div>
    </Layout>
  );
}
