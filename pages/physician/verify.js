import Layout from "../../components/Layout";
import styles from "../../styles/verify.module.css";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

export default function Verify() {
  return (
    <Layout title="Password Confirmed">
      <div className={styles.verified}>
        <CheckCircleIcon className={styles.confirmedIcon} />
        <Typography variant="subtitle1">
          Password Successfully Verified
        </Typography>
        <Typography variant="subtitle1">Now You can Login </Typography>
      </div>
    </Layout>
  );
}
