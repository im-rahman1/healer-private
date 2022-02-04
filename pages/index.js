import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import useWindowSize from "./hook/useWindowSize";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

export default function Home() {
  const windowSize = useWindowSize();

  console.log(windowSize);

  return (
    <Layout>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper">
        <SwiperSlide>
          <Image
            src="/homeImg1.jpg"
            className={styles.carousel_img}
            alt="homeImg1"
            layout="responsive"
            width={400}
            height={100}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/homeImg2.jpg"
            className={styles.carousel_img}
            alt="homeImg1"
            layout="responsive"
            width={400}
            height={100}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/homeImg3.jpg"
            className={styles.carousel_img}
            alt="homeImg1"
            layout="responsive"
            width={400}
            height={100}
          />
        </SwiperSlide>
      </Swiper>
    </Layout>
  );
}
