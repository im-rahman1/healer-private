import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import axios from "axios";
// import { TAGM_ID } from "./../config/config";

import ProductCard from "@/components/common/product";

import { Link, Typography } from "@mui/material";
import playStore from "../public/playStore.png";
import { API_URL } from "./../config/config";
import { Box } from "@mui/system";
import TagManager from "react-gtm-module";

import { useUserAuth } from "context/authContext";

function addProductJsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Healer - Cure With Nature",
    "url": "https://healer.pk",
    "logo": "https://healer.pk/health-feed/healer-logo/",
    "sameAs": [
    "https://facebook.com/healercare",
    "https://twitter.com/healercare",
    "https://instagram.com/healercare",
    "https://youtube.com/c/healercare",
    "https://linkedin.com/company/healercare",
    "https://healer.pk"
  ]
    }`,
  };
}

export default function Home() {
  const {user} = useUserAuth();

  const [currentUser, setCurrentUser] = useState(user);

  const [shuffledArray, setShuffledArray] = useState([]);
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

  const muiStyles = {
    img: {
      width: "100%",
      height: "110%",
    },
  };

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
    console.log(window.uName);
    // TagManager.initialize({ gtmId: TAGM_ID });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      title="Healer | Cure With Nature"
      addProductJson={addProductJsonLd()}>
      <div className={styles.bannerContainer}>
        <Box
          sx={muiStyles.img}
          component="img"
          alt="banner"
          src="/banners.jpeg"
        />
      </div>
      {!brands && (
        <div>
          <Typography sx={{ margin: "20px 0 0 10px" }} variant="h5">
            Featured
          </Typography>
          <Typography
            sx={{ marginLeft: "12px", opacity: "0.7" }}
            variant="body2">
            Book Appointment with Top Physicians
          </Typography>
        </div>
      )}
      
      <div className={styles.downloadContainerContainer}>
        <div className={styles.downloadContainer}>
          <div className={styles.downloadImgContainer}>
            <Box
              sx={muiStyles.img}
              component="img"
              alt="download Image"
              src="/downloadImg.png"
            />
          </div>
          <div className={styles.downloadNowTxt}>
            <Typography variant="h6">Download The Healer Now</Typography>
            <Typography variant="body2">
              Get Video Consultation with the best Tabib. Order herbal Unani
              Medicines form the comfort of your home.
            </Typography>
            <div className={styles.playstoreBtn}>
              <a href="https://play.google.com/store/apps/details?id=com.healer.nature">
                <Image src={playStore} alt="get it on playstore" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Typography sx={{ margin: "20px 0 0 10px" }} variant="h6">
          Top Brands
        </Typography>
        <Typography sx={{ marginLeft: "12px", opacity: "0.7" }} variant="body2">
          Order Medicines Of Top Brands
        </Typography>
        <div className={styles.scrollable}>
          {shuffledArray.map((brand) => (
            <div className={styles.brandCard} key={brand.name}>
              <div className={styles.avatar}>
                <div className={styles.avatar__img}>
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    width="50px"
                    height="33px"
                  />
                </div>
              </div>
              <Typography sx={{ opacity: "0.8" }}>{brand.name}</Typography>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
