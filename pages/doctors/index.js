import React, { useState, useEffect } from "react";
import styles from "@/styles/physicians.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/config/config";

// mui
import {
  Avatar,
  Breadcrumbs,
  Typography,
  Rating,
  Skeleton,
} from "@mui/material";
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
    width: "3.5rem",
    height: "3.5rem",
    position: "relative",
    top: "0.7rem",
    cursor: "pointer",
  },
  opacity: {
    opacity: "0.8",
  },
  boldTxt: {
    fontWeight: "bold",
    cursor: "pointer",
  },
};

const breadcrumbs = [
  <Link href="/" key="1" color="inherit" passHref>
    <Typography sx={muiStyles.link}>Home</Typography>
  </Link>,
  <Typography href="/" key="3" color="text.primary">
    Physicians
  </Typography>,
];

export default function Physicians() {
  const [doctors, setDoctors] = useState(null);

  const getDoctors = async () => {
    await axios
      .post(`${API_URL}/doctor/doctorType`, {
        city: "",
        nearBy: false,
        latitude: 0,
        longitude: 0,
      })
      .then((res) => {
        setDoctors(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        // setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout title="Physicians">
      <div className={styles.breadcrumbContainer}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      {doctors ? (
        doctors
          .filter(
            (doctor) =>
              (doctor.doctor._id != "61c95c85e42128d4a149606c") &
              (doctor.doctor._id != "61c95c5fe42128d4a1496069")
          )
          .map((doctor) => (
            <div key={doctor.doctor._id} className={styles.DocCardContainer}>
              <div className={styles.docCard}>
                {doctor.doctor.nctVerified && (
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
                )}
                {doctor.doctor.pmcVerified && (
                  <div className={styles.badgeContainer}>
                    <div className={styles.badge}>
                      <DoneIcon sx={{ color: "#01a22e", fontSize: "16px" }} />
                      <div className={styles.badgeText}>
                        <Typography sx={{ fontSize: "12px" }} variant="body2">
                          PMC verified
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}
                <div className={styles.docCard__header}>
                  <div className={styles.docCard__info}>
                    <Link href={`/doctors/${doctor.doctor._id}`} passHref>
                      <Avatar
                        src={doctor.doctor.profileImage}
                        variant="rounded"
                        sx={muiStyles.avatar}
                        alt="Doctor's profile image"
                      />
                    </Link>
                    <div>
                      <Link href={`/doctors/${doctor.doctor._id}`} passHref>
                        <Typography
                          sx={
                            muiStyles.boldTxt
                          }>{`${doctor.doctor.title} ${doctor.doctor.fullName}`}</Typography>
                      </Link>
                      <Typography
                        sx={{ color: "#01a22e", opacity: "0.8" }}
                        variant="body2">
                        {doctor.doctor.practiceDomain}
                      </Typography>
                      <Typography sx={muiStyles.opacity} variant="caption">
                        {doctor.doctor.study}
                      </Typography>
                      <Typography sx={muiStyles.opacity} variant="body2">
                        {doctor.doctor.experience} years of experience
                      </Typography>
                    </div>
                  </div>
                </div>
                <Typography sx={{ paddingLeft: "0.6rem" }}>
                  Book Appointment
                </Typography>
                <div className={styles.appointments}>
                  {doctor.services.videoFeeAvail && (
                    <div className={styles.appointment}>
                      <Typography variant="body2">Online</Typography>
                      <Typography variant="caption">
                        Video Consultation
                      </Typography>
                      <div className={styles.pricing}>
                        <div className={styles.availablity}>
                          <CircleIcon sx={{ fontSize: "14px" }} />
                          <Typography variant="body2">
                            Available Today
                          </Typography>
                        </div>
                        <Typography variant="body2">
                          {doctor.services.videoFee}
                        </Typography>
                      </div>
                    </div>
                  )}
                  {doctor.services.inClinicFeeAvail && (
                    <div className={styles.appointment}>
                      <Typography variant="body2">InClinic</Typography>
                      {doctor.doctor.clinicName && (
                        <Typography sx={muiStyles.opacity} variant="caption">
                          {doctor.doctor.clinicName},
                          {doctor.doctor.clinicAddress}
                        </Typography>
                      )}
                      <div className={styles.pricing}>
                        <div className={styles.availablity}>
                          <CircleIcon sx={{ fontSize: "14px" }} />
                          <Typography variant="body2">
                            Available Today
                          </Typography>
                        </div>
                        <Typography variant="body2">Rs 1000</Typography>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className={styles.skeletonContainer}>
          <div className={styles.skeleton}>
            <div className={styles.skeleton__header}>
              <div>
                <Skeleton variant="circular" width={70} height={70} />
              </div>
              <div className={styles.header__text}>
                <Skeleton variant="text"/>
                <Skeleton variant="text"/>
                <Skeleton variant="text"/>
              </div>
            </div>
              <Skeleton variant="rectangular" height={150} />
          </div>
          <div className={styles.skeleton}>
            <div className={styles.skeleton__header}>
              <div>
                <Skeleton variant="circular" width={70} height={70} />
              </div>
              <div className={styles.header__text}>
                <Skeleton variant="text"/>
                <Skeleton variant="text"/>
                <Skeleton variant="text"/>
              </div>
            </div>
              <Skeleton variant="rectangular" height={150} />
          </div>
        </div>
      )}
    </Layout>
  );
}

// 273615