import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import axios from "axios";

import DocCard from "@/components/common/docCard";
import ProductCard from "@/components/common/product";

import { Typography } from "@mui/material";
import playStore from "../public/playStore.png";
import { API_URL } from "./../config/config";

export default function Home() {
  const [data, setData] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [skip, setSkip] = useState(0);
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
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

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

  const onScroll = (e) => {
    let clientW = e.target.clientWidth;
    let scrollL = e.target.scrollLeft;
    let scrollW = e.target.scrollWidth;

    let scroll = clientW + scrollL + 0.4;

    if (scrollW <= scroll) {
      //   console.log("bottom");
      setSkip(skip + 10);
      getProducts(skip);
    }
  };

  //   /EcomMedicine/medicineForHomePage
  // /EcomMedicine/getMedicines
  const getProducts = (s) => {
    axios
      .post(`${API_URL}/EcomMedicine/medicineForHomePage`, {
        skip: s,
      })
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const categorizeProducts = () => {
    let menProduct = [];
    let womenProduct = [];

    data.map((product) => {
      if (product.tags.includes(`women`)) {
        womenProduct.push(product);
      } else if (product.tags.includes(`men`)) {
        menProduct.push(product);
      }
    });

    setMenProducts(menProduct);
    setWomenProducts(womenProduct);
  };

  // console.log(shuffledArray);
  // console.log(data);
  // console.log(skip);
  console.log(menProducts);
  console.log(womenProducts);

  useEffect(() => {
    categorizeProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    shuffle(brands);
    getProducts(skip);

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
          <div className={styles.scrollable}>
            {brands.map((d) => (
              <DocCard key={d.name} />
            ))}
          </div>
        </div>
      )}
      {menProducts.length > 0 && (
        <div>
          <div className={styles.productCardContainerTxt}>
            <Typography sx={{ margin: "20px 0 0 10px" }} variant="h5">
              Men&apos;s Health
            </Typography>
            <Typography
              sx={{ margin: "20px 0 0 10px", color: "#01a22e" }}
              variant="body2">
              View All
            </Typography>
          </div>
          <div onScroll={(e) => onScroll(e)} className={styles.scrollable}>
            {menProducts.map((product) => (
              <ProductCard key={product._id} name={product._id} />
            ))}
          </div>
        </div>
      )}
      {womenProducts.length > 0 && (
        <div>
          <div className={styles.productCardContainerTxt}>
            <Typography sx={{ margin: "20px 0 0 10px" }} variant="h5">
              Women&apos;s Health
            </Typography>
            <Typography
              sx={{ margin: "20px 0 0 10px", color: "#01a22e" }}
              variant="body2">
              View All
            </Typography>
          </div>
          <div className={styles.scrollable}>
            {womenProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
      <div className={styles.downloadContainerContainer}>
        <div className={styles.downloadContainer}>
          <div className={styles.downloadImgContainer}>
            <Image priority alt="banner" src="/downloadImg.jpg" layout="fill" />
          </div>
          <div className={styles.downloadNowTxt}>
            <Typography variant="h5">Download The Healer Now</Typography>
            <Typography>
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
        <Typography sx={{ margin: "20px 0 0 10px" }} variant="h5">
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
                    width="65px"
                    height="45px"
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
