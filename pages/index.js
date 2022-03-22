import React, {useState, useEffect} from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

import DocCard from "@/components/common/docCard";
import ProductCard from "@/components/common/product";

import {Typography} from "@mui/material";
import playStore from "../public/playStore.png";

export default function Home() {
    const brands = [
        {img: "/brandsIcons/Lasani.jpeg", name: "Lasani"},
        {img: "/brandsIcons/Ajmal.png", name: "Ajmal"},
        {img: "/brandsIcons/Aftab Qarshi.png", name: "Aftab Qarshi"},
        {img: "/brandsIcons/Ashraf.png", name: "Ashraf"},
        {img: "/brandsIcons/Brick.jpeg", name: "Brick"},
        {img: "/brandsIcons/Hamdard.jpeg", name: "Hamdard"},
        {img: "/brandsIcons/Marhaba.png", name: "Marhaba"},
        {img: "/brandsIcons/Qarshi.png", name: "Qarshi"},
        {img: "/brandsIcons/Tayyebi.png", name: "Tayyebi"},
        {img: "/brandsIcons/TT.jpeg", name: "TT"},
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
        <Layout title="Healer - Cure With Nature">
            <div className={styles.bannerContainer}>
              <Image
                  priority
                  className={styles.image}
                  alt="banner"
                  src="/banners.jpeg"
                  layout="fill"
              />
            </div>
            {!brands && <div>
              <Typography sx={{margin: "20px 0 0 10px"}} variant="h5">
                Featured
              </Typography>
              <Typography sx={{marginLeft: "12px", opacity: "0.7"}} variant="body2">
                Book Appointment with Top Physicians
              </Typography>
              <div className={styles.scrollable}>
                {brands.map((d) => (
                    <DocCard key={d.name}/>
                ))}
              </div>
            </div>}
            <div>
              <div className={styles.productCardContainerTxt}>
                <Typography sx={{margin: "20px 0 0 10px"}} variant="h5">
                  Men&apos;s Health
                </Typography>
                <Typography
                    sx={{margin: "20px 0 0 10px", color: "#01a22e"}}
                    variant="body2">
                  View All
                </Typography>
              </div>
              <div className={styles.scrollable}>
                {brands.map((d) => (
                    <ProductCard key={d.name}/>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.productCardContainerTxt}>
                <Typography sx={{margin: "20px 0 0 10px"}} variant="h5">
                  Women&apos;s Health
                </Typography>
                <Typography
                    sx={{margin: "20px 0 0 10px", color: "#01a22e"}}
                    variant="body2">
                  View All
                </Typography>
              </div>
              <div className={styles.scrollable}>
                {brands.map((d) => (
                    <ProductCard key={d.name}/>
                ))}
              </div>
            </div>
            <div className={styles.downloadContainerContainer}>
              <div className={styles.downloadContainer}>
                <div className={styles.downloadImgContainer}>
                  <Image
                      priority
                      alt="banner"
                      src="/downloadImg.jpg"
                      layout="fill"
                  />
                </div>
                <div  className={styles.downloadNowTxt}>
                  <Typography variant="h5">Download The Healer Now</Typography>
                  <Typography>Get Video Consultation with the best Tabib. Order herbal Unani Medicines form the
                    comfort of your home.</Typography>
                  <div className={styles.playstoreBtn}>
                    <a href="https://play.google.com/store/apps/details?id=com.healer.nature">
                      <Image src={playStore} alt="get it on playstore"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Typography sx={{margin: "20px 0 0 10px"}} variant="h5">
                Top Brands
              </Typography>
              <Typography sx={{marginLeft: "12px", opacity: "0.7"}} variant="body2">
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
                              width="65px"
                              height="45px"
                          />
                        </div>
                      </div>
                      <Typography sx={{opacity: "0.8"}}>{brand.name}</Typography>
                    </div>
                ))}
              </div>
            </div>

        </Layout>
    );
}
