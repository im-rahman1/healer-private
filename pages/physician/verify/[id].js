import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Layout from "../../../components/Layout";
import { API_URL } from "../../../config/reset-password";
import styles from "../../../styles/email-verify.module.css";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

export default function VerifyDoctor() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, setLoading] = React.useState(true);

  async function verify() {
    await axios
      .get(`${API_URL}/doctor/confirmation/${id}`)
      .then((res) => {
        if (res.data === true) {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(true);
      });
  }

  React.useEffect(() => {
    verify();
  });

  return (
    <Layout title="Verify" description="robots" keywords="noindex, nofollow">
      <div className={styles.verifyPage}>
        {loading ? (
          <div className={styles.loading}></div>
        ) : (
          <div className={styles.verified}>
            <CheckCircleIcon className={styles.confirmedIcon} />
            <Typography variant="h6">Email Successfully Verified</Typography>
          </div>
        )}
      </div>
    </Layout>
  );
}
