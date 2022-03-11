import Layout from "@/components/Layout";
import styles from "@/styles/about.module.css";
import { Typography } from "@mui/material";

export default function About() {
  return (
    <Layout title="About Us">
      <div className={styles.aboutPage}>
        <Typography>
          Healer is a healthcare platform serving in Unani Medicines where patient can get medical advice from healers. Our virtual online medical help service provides the ultimate convenience and premier health care. we are proud to be in the Telemedicine industry. Healer upholds the highest standards when approving physicians to practice in the online consultation service. We are adding new healers by the day. We stringently verify our online healers to ensure they are fully licensed so that the care we provide will always be of the highest quality. healer.pk is brought to you by Healercare Pvt Ltd. Healer team consists of eminent healers, researchers and programmers who work round the clock to innovate, create and implement the best technologies for the use of healers and patients.
        </Typography>
      </div>
    </Layout>
  );
}
