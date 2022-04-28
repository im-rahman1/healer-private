import { Avatar, Typography } from "@mui/material";
import styles from "@/styles/common/docCard.module.css";
import DoneIcon from "@mui/icons-material/Done";
import CircleIcon from "@mui/icons-material/Circle";

export default function DocCard(img, docName, type, qualification, experience) {
  const muiStyles = {
    avatar: {
      width: "4rem",
      height: "4rem",
    },
    opacity: {
      opacity: "0.7",
    },
  };

  return (
    <div className={styles.docCard}>
      <div className={styles.badgeContainer}>
        <div className={styles.badge}>
          <DoneIcon sx={{ color: "#01a22e", fontSize: "16px" }} />
          <div className={styles.badgeText}>
            <Typography sx={{ fontSize: "12px" }} variant="body2">
              NCT verified
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.docCard__header}>
        <div className={styles.docCard__info}>
          <Avatar sx={muiStyles.avatar} alt="Doctor's profile image" />
          <div>
            <Typography>Dr. Muhammad Rahman</Typography>
            <Typography sx={{ color: "#01a22e" }} variant="body2">
              Unani Physician
            </Typography>
            <Typography sx={muiStyles.opacity} variant="caption">
              BEMS, Mphil
            </Typography>
            <Typography sx={muiStyles.opacity} variant="body2">
              12 years of experience
            </Typography>
          </div>
        </div>
      </div>
      <Typography sx={{ paddingLeft: "0.6rem" }}>Book Appointment</Typography>
      <div className={styles.appointments}>
        <div className={styles.appointment}>
          <Typography variant="body2">Online</Typography>
          <Typography variant="caption">Video Consultation</Typography>
          <div className={styles.pricing}>
            <div className={styles.availablity}>
              <CircleIcon sx={{ fontSize: "14px"}} />
              <Typography variant="body2">Available Today</Typography>
            </div>
            <Typography variant="body2">Rs 1000</Typography>
          </div>
        </div>
        <div className={styles.appointment}>
          <Typography  variant="body2">InClinic</Typography>
          <Typography variant="caption">Al Noor Clinic</Typography>
          <Typography sx={muiStyles.opacity} variant="caption">Pattoki, California, USA</Typography>
          <div className={styles.pricing}>
            <div className={styles.availablity}>
              <CircleIcon sx={{ fontSize: "14px"}} />
              <Typography variant="body2">Available Today</Typography>
            </div>
            <Typography variant="body2">Rs 1000</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
