import { Avatar, Typography } from "@mui/material";
import styles from "@/styles/common/docCard.module.css";

export default function DocCard(img, docName, type, qualification, experience) {
  const muiStyles = {
    opacity: "0.8",
  };

  return (
    <div className={styles.docCard}>
      <Avatar sx={{ width: 80, height: 80 }} alt="Doctor's profile image" />
      <div className={styles.cardTxt}>
        <Typography>Dr. Muhammad Rahman</Typography>
        <Typography sx={{ color: "#01a22e" }} variant="body2">
          Unani Physician
        </Typography>
        <Typography sx={muiStyles} variant="body2">
          BEMS, Mphil
        </Typography>
        <Typography sx={muiStyles} variant="body2">
          12 years of experience
        </Typography>
      </div>
    </div>
  );
}
