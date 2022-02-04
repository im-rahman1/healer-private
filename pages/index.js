import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

export default function Home() {
  return (
    <Layout>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
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
