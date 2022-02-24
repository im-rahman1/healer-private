import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Layout from "@/components/Layout";
import { API_URL } from "@/config/reset-password";
import styles from "@/styles/email-verify.module.css";

import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

export default function VerifyDoctor() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

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
        setError(true);
        // console.log(error);
      });
  }

  React.useEffect(() => {
    verify();
  });

  return (
    <Layout title="Verify" description="robots" keywords="noindex, nofollow">
      <div className={styles.verifyPage}>
        {loading ? (
          <div>
            {error ? (
              <div className={styles.response}>
                <ErrorIcon className={styles.muiIcon}></ErrorIcon>
                <Typography variant="h6">Something went wrong!</Typography>
              </div>
            ) : (
              <div className={styles.loading}></div>
            )}
          </div>
        ) : (
          <div className={styles.response}>
            <CheckCircleIcon className={styles.muiIcon} />
            <Typography variant="h6">Email Successfully Verified</Typography>
          </div>
        )}
      </div>
    </Layout>
  );
}
