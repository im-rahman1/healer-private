import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <Carousel
        className={styles.carousel_imgContainer}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators
        useKeyboardArrows
        infiniteLoop
        emulateTouch
        stopOnHover
        autoPlay>
        <div className={styles.carousel_imgContainer}>
          <Image
            priority
            src="/homeImg1.jpg"
            className={styles.carousel_img}
            alt="homeImg1"
            layout="responsive"
            width={350}
            height={100}
          />
        </div>
        <div className={styles.carousel_imgContainer}>
          <Image
            src="/homeImg2.jpg"
            className={styles.carousel_img}
            alt="homeImg1"
            layout="responsive"
            width={350}
            height={100}
          />
        </div>
        <div className={styles.carousel_imgContainer}>
          <Image
            src="/homeImg3.jpg"
            className={styles.carousel_img}
            alt="homeImg1"
            layout="responsive"
            width={350}
            height={100}
          />
        </div>
      </Carousel>
    </Layout>
  );
}
