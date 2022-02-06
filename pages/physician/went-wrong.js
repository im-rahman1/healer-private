import Layout from "../../components/Layout";
import styles from '../../styles/went-wrong.module.css'

import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";

export default function WentWrong() {
  return (
    <Layout title="Went Wrong">
      <div className={styles.wentWrongPage}>
      <ErrorIcon className={styles.muiIcon}></ErrorIcon>
      <Typography variant="h6">Something went wrong!</Typography>
      </div>
    </Layout>
  );
}
