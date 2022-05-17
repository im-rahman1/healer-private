import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/bookAppointment.module.css";
import axios from "axios";
import { API_URL } from "@/config/config";

// mui
import {
  Typography,
  Breadcrumbs,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";

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

export default function BookAppointment({ docData }) {
  const [doc, setDoc] = useState({ ...docData });
  const [week1, setWeek1] = useState([]);
  const [week2, setWeek2] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDaySlot, setSelectedDaySlot] = useState(null);
  const [callType, setCallType] = useState(null);

  const docDetails = doc.doctorDetails[0];
  const docServices = doc.practice[0];

  const breadcrumbs = [
    <Link href="/" key="1" color="inherit" passHref>
      <Typography variant="caption" sx={muiStyles.link}>
        Home
      </Typography>
    </Link>,
    <Link href="/doctors" key="1" color="inherit" passHref>
      <Typography variant="caption" sx={muiStyles.link}>
        Doctors
      </Typography>
    </Link>,
    <Link href={`/doctors/${docDetails._id}`} key="1" color="inherit" passHref>
      <Typography variant="caption" sx={muiStyles.link}>
        {`${docDetails.title} ${docDetails.fullName}`}
      </Typography>
    </Link>,
    <Typography variant="caption" key="3" color="text.primary">
      Book Appointment
    </Typography>,
  ];

  function extractDays() {
    const weekFirst = docServices.weekFirst;
    const weekSecond = docServices.weekSecond;
    let daysOfWeek1 = Object.keys(weekFirst).filter((key) => weekFirst[key]);
    let daysOfWeek2 = Object.keys(weekSecond).filter((key) => weekSecond[key]);

    setWeek1(daysOfWeek1);
    setWeek2(daysOfWeek2);
  }

  function convertT(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  function convertTime(time) {
    if (time <= 9) {
      return convertT(`0${time}:00`);
    } else if (time == 24) {
      return convertT(`00:00`);
    } else {
      return convertT(`${time}:00`);
    }
  }

  const handleCheckBox = (type) => {
    setCallType(type);
  };

  // const handleChipClick = (slot) => {
  //   setSelectedTimeSlot(slot);
  //   console.log(slot);
  // }

  useEffect(() => {
    extractDays();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(doc);
  // console.log(docServices);
  // console.log(docDetails);
  // console.log(week1);
  // console.log(week2);

  return (
    <Layout title="Book Appointment">
      <ThemeProvider theme={theme}>
        <div className={styles.breadcrumbContainer}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className={styles.docContainer}>
          <div className={styles.docInfoCard}>
            <div className={styles.docInfo}>
              <Avatar src={docDetails.profileImage} sx={muiStyles.avatar} />
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
          <div className={styles.bookAppointmentContainer}>
            <Typography sx={{margin: "0.6rem"}}>Book Appointment</Typography>
            <div className={styles.daySlotContainer}>
              <div
                className={
                  selectedDaySlot == "Mon, May17"
                    ? styles.daySlotSelected
                    : styles.daySlot
                }
                onClick={() => setSelectedDaySlot("Mon, May17")}>
                <Typography>Mon, May17</Typography>
              </div>
              <div
                className={
                  selectedDaySlot == "Tue, May18"
                    ? styles.daySlotSelected
                    : styles.daySlot
                }
                onClick={() => setSelectedDaySlot("Tue, May18")}>
                <Typography>Tue, May18</Typography>
              </div>
              <div
                className={
                  selectedDaySlot == "Wed, May19"
                    ? styles.daySlotSelected
                    : styles.daySlot
                }
                onClick={() => setSelectedDaySlot("Wed, May19")}>
                <Typography>Wed, May19</Typography>
              </div>
              <div
                className={
                  selectedDaySlot == "Thu, May20"
                    ? styles.daySlotSelected
                    : styles.daySlot
                }
                onClick={() => setSelectedDaySlot("Thu, May20")}>
                <Typography>Thu, May20</Typography>
              </div>
              <div
                className={
                  selectedDaySlot == "Fri, May21"
                    ? styles.daySlotSelected
                    : styles.daySlot
                }
                onClick={() => setSelectedDaySlot("Fri, May21")}>
                <Typography>Fri, May21</Typography>
              </div>
              <div
                className={
                  selectedDaySlot == "Sat, May22"
                    ? styles.daySlotSelected
                    : styles.daySlot
                }
                onClick={() => setSelectedDaySlot("Sat, May22")}>
                <Typography>Sat, May22</Typography>
              </div>
            </div>
            <Divider sx={{margin: '0.7rem'}} />
            <div className={styles.timeSlotContainer}>
              <span
                className={
                  selectedTimeSlot == "1:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("1:00pm")}>
                <Typography>1:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "2:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("2:00pm")}>
                <Typography>2:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "3:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("3:00pm")}>
                <Typography>3:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "4:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("4:00pm")}>
                <Typography>4:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "5:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("5:00pm")}>
                <Typography>5:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "6:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("6:00pm")}>
                <Typography>6:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "7:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("7:00pm")}>
                <Typography>7:00pm</Typography>
              </span>
              <span
                className={
                  selectedTimeSlot == "8:00pm"
                    ? styles.timeSlotSelected
                    : styles.timeSlot
                }
                onClick={() => setSelectedTimeSlot("8:00pm")}>
                <Typography>8:00pm</Typography>
              </span>
            </div>
            <div className={styles.appointmentFooter}>
              <div className={styles.checkboxes}>
                <div className={styles.checkbox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={callType == "video" ? true : false}
                        onClick={() => handleCheckBox("video")}
                      />
                    }
                    label="Video Call"
                  />
                </div>
                <div className={styles.checkbox}>
                  <FormControlLabel
                    label="Audio Call"
                    control={
                      <Checkbox
                        checked={callType == "audio" ? true : false}
                        onClick={() => handleCheckBox("audio")}
                      />
                    }
                  />
                </div>
              </div>
              <div className={styles.bookBt}>
                <Button sx={{width: '300px'}} size='small' variant="contained">Book Appointment</Button>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { docName } = params;

  console.log(docName);

  const res = await axios.post(`${API_URL}/doctor/doctorDetails`, {
    _id: docName,
  });

  // if (!res) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //   }
  //   }
  // }

  // console.log(res.data);

  // Pass data to the page via props
  return {
    props: {
      docData: res.data,
    },
  };
}
