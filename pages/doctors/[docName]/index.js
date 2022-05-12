import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/docInfo.module.css";
import axios from "axios";
import { API_URL } from "@/config/config";

import {
  Typography,
  Breadcrumbs,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { minWidth } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./../../../styles/theme";

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
  opacity: {
    opacity: "0.8",
  },
  coloredText: {
    color: "#01a22e",
  },
  icon: {
    color: "#01a22e",
  },
  txtBolder: {
    fontWeight: "bold",
  },
  appointmentDays: {
    maxWidth: "120px",
    color: "#01a22e",
  },
};

export default function DocInfo({ docData }) {

  const [doc, setDoc] = useState({...docData})

  console.log(doc);

  const docDetails = doc.doctorDetails[0];

  const breadcrumbs = [
    <Link href="/" key="1" color="inherit" passHref>
      <Typography sx={muiStyles.link}>Home</Typography>
    </Link>,
    <Link href="/doctors" key="1" color="inherit" passHref>
      <Typography sx={muiStyles.link}>Doctors</Typography>
    </Link>,
    <Typography key="3" color="text.primary">
      {`${docDetails.title} ${docDetails.fullName}`}
    </Typography>,
  ];


  return (
    <Layout title="">
      <div className={styles.breadcrumbContainer}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className={styles.docProfileContainer}>
        <div className={styles.docInfoContainer}>
          <div className={styles.docInfoCard}>
            <div className={styles.docInfo}>
              <Avatar src={docDetails.profileImage} variant="rounded" sx={muiStyles.avatar} />
              <div>
                <Typography sx={muiStyles.txtBolder} variant="body">
                {`${docDetails.title} ${docDetails.fullName}`}
                </Typography>
                <Typography variant="body2" sx={muiStyles.coloredText}>
                  {docDetails.practiceDomain}
                </Typography>
                <Typography variant="body2" sx={muiStyles.opacity}>
                {docDetails.study}
                </Typography>
                <Typography variant="body2" sx={muiStyles.opacity}>
                {docDetails.experience} years of experience
                </Typography>
              </div>
            </div>
            <div>
              <div className={styles.badge}>
                <DoneIcon sx={muiStyles.icon} />
                <div className={styles.badge__txt}>
                  <Typography variant="caption">NCT verified</Typography>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.servicesContainer}>
            <div className={styles.services__text}>
              <div className={styles.services}>
                <Typography variant="h6">Services & Treatments:</Typography>
                <div className={styles.services__body}>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                </div>
              </div>
              <div className={styles.services}>
                <Typography variant="h6">Specialization:</Typography>
                <div className={styles.services__body}>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                </div>
              </div>
              <div className={styles.services}>
                <Typography variant="h6">Qualification:</Typography>
                <div className={styles.services__body}>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography variant="body2">• lorem ipsum</Typography>
                  <Typography  variant="body2">• lorem ipsum</Typography>
                </div>
              </div>
            </div>
            <div className={styles.appointmentContainerForPhone}>
              <div className={styles.appointment}>
                <Typography sx={muiStyles.coloredText}>
                  Virtual Virtual Appointment
                </Typography>
                <Divider />
                <div className={styles.appointment__fee}>
                  <Typography variant="body2">Fee</Typography>
                  <Typography variant="body2">PKR1000</Typography>
                </div>
                <Divider />
                <div className={styles.scheduleContainer}>
                  <div className={styles.schedule}>
                    <Typography
                      sx={muiStyles.appointmentDays}
                      variant="caption">
                      Mon, Tue, Wed, thu, fri
                    </Typography>
                    <Typography sx={muiStyles.opacity} variant="body2">
                      8:00am to 3:00pm
                    </Typography>
                  </div>
                  <div className={styles.schedule}>
                    <Typography
                      sx={muiStyles.appointmentDays}
                      variant="caption">
                      Sat, Sun
                    </Typography>
                    <Typography sx={muiStyles.opacity} variant="body2">
                      8:00am to 3:00pm
                    </Typography>
                  </div>
                </div>
                <ThemeProvider theme={theme}>
                  <Button size="small" variant="contained">
                    Book Appointment
                  </Button>
                </ThemeProvider>
              </div>
              <div className={styles.appointment}>
                <Typography sx={muiStyles.coloredText}>
                  InClinic Appointment
                </Typography>
                <Divider />
                <div className={styles.appointment__fee}>
                  <Typography variant="body2">Fee</Typography>
                  <Typography variant="body2">PKR1000</Typography>
                </div>
                <Divider />
                <div className={styles.scheduleContainer}>
                  <div className={styles.schedule}>
                    <Typography
                      sx={muiStyles.appointmentDays}
                      variant="caption">
                      Mon, Tue, Wed, thu, fri
                    </Typography>
                    <Typography sx={muiStyles.opacity} variant="body2">
                      8:00am to 3:00pm
                    </Typography>
                  </div>
                  <div className={styles.schedule}>
                    <Typography
                      sx={muiStyles.appointmentDays}
                      variant="caption">
                      Sat, Sun
                    </Typography>
                    <Typography sx={muiStyles.opacity} variant="body2">
                      8:00am to 3:00pm
                    </Typography>
                  </div>
                </div>
                <ThemeProvider theme={theme}>
                  <Button size="small" variant="contained">
                    Book Appointment
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.appointmentContainerForPC}>
          <div className={styles.appointment}>
            <Typography sx={muiStyles.coloredText}>
              Virtual Virtual Appointment
            </Typography>
            <Divider />
            <div className={styles.appointment__fee}>
              <Typography variant="body2">Fee</Typography>
              <Typography variant="body2">PKR1000</Typography>
            </div>
            <Divider />
            <div className={styles.scheduleContainer}>
              <div className={styles.schedule}>
                <Typography sx={muiStyles.appointmentDays} variant="caption">
                  Mon, Tue, Wed, thu, fri
                </Typography>
                <Typography sx={muiStyles.opacity} variant="body2">
                  8:00am to 3:00pm
                </Typography>
              </div>
              <div className={styles.schedule}>
                <Typography sx={muiStyles.appointmentDays} variant="caption">
                  Sat, Sun
                </Typography>
                <Typography sx={muiStyles.opacity} variant="body2">
                  8:00am to 3:00pm
                </Typography>
              </div>
            </div>
            <ThemeProvider theme={theme}>
              <Button size="small" variant="contained">
                Book Appointment
              </Button>
            </ThemeProvider>
          </div>
          <div className={styles.appointment}>
            <Typography sx={muiStyles.coloredText}>
              InClinic Appointment
            </Typography>
            <Divider />
            <div className={styles.appointment__fee}>
              <Typography variant="body2">Fee</Typography>
              <Typography variant="body2">PKR1000</Typography>
            </div>
            <Divider />
            <div className={styles.scheduleContainer}>
              <div className={styles.schedule}>
                <Typography sx={muiStyles.appointmentDays} variant="caption">
                  Mon, Tue, Wed, thu, fri
                </Typography>
                <Typography sx={muiStyles.opacity} variant="body2">
                  8:00am to 3:00pm
                </Typography>
              </div>
              <div className={styles.schedule}>
                <Typography sx={muiStyles.appointmentDays} variant="caption">
                  Sat, Sun
                </Typography>
                <Typography sx={muiStyles.opacity} variant="body2">
                  8:00am to 3:00pm
                </Typography>
              </div>
            </div>
            <ThemeProvider theme={theme}>
              <Button size="small" variant="contained">
                Book Appointment
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { docName } = params;

  const res = await axios
  .post(`${API_URL}/doctor/doctorDetails`, {
    "_id": docName
  });

  // if (!res) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //   }
  //   }
  // }

  console.log(res.data);

  // Pass data to the page via props
  return {
    props: {
      docData: res.data,
    },
  };
}

