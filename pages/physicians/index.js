import React from "react";
import styles from "@/styles/physicians.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";

// mui
import { Avatar, Breadcrumbs, Typography, Rating } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CircleIcon from "@mui/icons-material/Circle";

const muiStyles = {
  link: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  avatar: {
    width: "5rem",
    height: "5rem",
  },
};

export default function Physicians() {
  const breadcrumbs = [
    <Link href="/" key="1" color="inherit" passHref>
      <Typography sx={muiStyles.link}>Home</Typography>
    </Link>,
    <Typography href="/" key="3" color="text.primary">
      Physicians
    </Typography>,
  ];

  return (
    <Layout title="Physicians">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <div className={styles.docCards}>
        <div className={styles.docCard}>
          <div className={styles.bar}></div>
          <div className={styles.profileInfoContainer}>
            <div className={styles.profileInfo}>
              <Avatar src="" sx={muiStyles.avatar} />
              <div className={styles.profileInfo__text}>
                <Typography>Dr. Muhammad Rahman</Typography>
                <Typography variant="caption" sx={{ color: "#01a22e" }}>
                  Unani Physician
                </Typography>
                <Typography variant="caption">MBBS, phd</Typography>
                <Typography variant="caption">
                  12 years of experience
                </Typography>
              </div>
            </div>
            <div className={styles.flexEnd}>
              <div className={styles.reviewContainer}>
                <div className={styles.badgeContainer}>
                  <DoneIcon sx={{ color: "#01a22e" }} />
                  <div className={styles.badgeTxt}>
                    <Typography sx={{ whiteSpace: "noWrap" }} variant="body2">
                      NCT Verified
                    </Typography>
                  </div>
                </div>
                <div className={styles.rating}>
                  <Rating
                    value={3.5}
                    precision={0.5}
                    max={4}
                    sx={{ color: "#01a22e" }}
                    size="small"
                    readOnly
                  />
                  <Typography variant="body2">3.5</Typography>
                </div>
                <Typography variant="body2">30 reviews</Typography>
              </div>
            </div>
          </div>
          <Typography sx={{ marginLeft: "0.7rem" }}>
            Book Appointment
          </Typography>
          <div className={styles.bookAppointmentContainer}>
            <div className={styles.appointmentCard}>
              <div className={styles.appointment__info}>
                <Typography>InClinic</Typography>
                <Typography variant="caption">Video Consultation</Typography>
                <div className={styles.statusContainer}>
                  <div className={styles.status}>
                    <CircleIcon
                      sx={{
                        fontSize: "0.7rem",
                        opacity: 0.8,
                        color: "#01a22e",
                      }}
                    />
                    <Typography variant="caption">Available Today</Typography>
                  </div>
                  <Typography>Rs 1000</Typography>
                </div>
              </div>
            </div>
            <div className={styles.appointmentCard}>
              <div className={styles.appointment__info}>
                  <Typography>InClinic</Typography>
                <div className={styles.clinicAddress}>
                  <Typography variant="caption">Al Noor Clinic,</Typography>
                  <Typography variant="caption">Pattoki, California, US</Typography>
                </div>
                <div className={styles.statusContainer}>
                  <div className={styles.status}>
                    <CircleIcon
                      sx={{
                        fontSize: "0.7rem",
                        opacity: 0.8,
                        color: "#01a22e",
                      }}
                    />
                    <Typography variant="caption">Available Today</Typography>
                  </div>
                  <Typography>Rs 1000</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
