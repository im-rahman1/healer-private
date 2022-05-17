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
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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
  const [doc, setDoc] = useState({ ...docData });
  const [week1, setWeek1] = useState([]);
  const [week2, setWeek2] = useState([]);

  const docDetails = doc.doctorDetails[0];
  const docServices = doc.practice[0];

  const breadcrumbs = [
    <Link href="/" key="1" color="inherit" passHref>
      <Typography variant="body2" sx={muiStyles.link}>
        Home
      </Typography>
    </Link>,
    <Link href="/doctors" key="1" color="inherit" passHref>
      <Typography variant="body2" sx={muiStyles.link}>
        Doctors
      </Typography>
    </Link>,
    <Typography variant="body2" key="3" color="text.primary">
      {`${docDetails.title} ${docDetails.fullName}`}
    </Typography>,
  ];

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    margin: "0px",
    padding: "0",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      sx={{
        backgroundColor: "#01a22f15",
        borderRadius: "5px",
        padding: "0 5px",
      }}
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
      margin: "0px",
      padding: "0px",
    },
    width: "100%",
    minHeight: "2rem",
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    // borderTop: "1px solid rgba(0, 0, 0, .125)",
    margin: "0 0 0 0",
    padding: "10px",

    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
  }));

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

  console.log(docServices);
  console.log(docDetails);
  // console.log(week1);
  // console.log(week2);

  useEffect(() => {
    extractDays();

    // console.log(convertTime(22));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={`${docDetails.title} ${docDetails.fullName}`}>
      <div className={styles.breadcrumbContainer}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className={styles.docProfileContainer}>
        <div className={styles.docInfoContainer}>
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
          <div className={styles.servicesContainer}>
            <div className={styles.services__text}>
              {docDetails.therapySpecialities.length > 0 && (
                <div className={styles.services}>
                  <Typography variant="h6">Services & Treatments:</Typography>
                  <div className={styles.services__body}>
                    {docDetails.therapySpecialities.map((speciality) => (
                      <Typography variant="body2" key={speciality}>
                        • {speciality}
                      </Typography>
                    ))}
                  </div>
                </div>
              )}
              {docDetails.specialization.length > 0 && (
                <div className={styles.services}>
                  <Typography variant="h6">Specialization:</Typography>
                  <div className={styles.services__body}>
                    {docDetails.specialization.map((special) => (
                      <Typography variant="body2" key={special}>
                        • {special}
                      </Typography>
                    ))}
                  </div>
                </div>
              )}
              {docDetails.studyDetails.length > 0 && (
                <div className={styles.services}>
                  <Typography variant="h6">Qualification:</Typography>
                  <div className={styles.services__body}>
                    {docDetails.studyDetails.map((study) => (
                      <Typography variant="body2" key={study}>
                        • {study}
                      </Typography>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.appointmentContainerForPhone}>
              {
                docServices.videoFeeAvail && (
                  <div className={styles.appointment}>
                    <Typography sx={muiStyles.coloredText}>
                      Online Virtual Appointment
                    </Typography>
                    <Divider />
                    <div className={styles.appointment__fee}>
                      <Typography variant="body2">Fee</Typography>
                      <Typography variant="body2">
                        PKR{docServices.videoFee}
                      </Typography>
                    </div>
                    <Divider />
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header">
                        <Typography>{`${week1[0]} | ${convertTime(
                          docServices.timeFirstSessionOne.start
                        )} - ${convertTime(
                          docServices.timeFirstSessionOne.end
                        )}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.scheduleContainer}>
                          {week1.length > 0 &&
                            week1.map((day) => (
                              <div className={styles.schedule} key={day}>
                                <Typography
                                  sx={muiStyles.appointmentDays}
                                  variant="caption">
                                  {day}
                                </Typography>
                                <div className={styles.schedule__timing}>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeFirstSessionOne.start |
                                      docServices.timeFirstSessionOne.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeFirstSessionOne.start
                                      )} - ${convertTime(
                                        docServices.timeFirstSessionOne.end
                                      )}`}
                                  </Typography>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeFirstSessionTwo.start |
                                      docServices.timeFirstSessionTwo.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeFirstSessionTwo.start
                                      )} - ${convertTime(
                                        docServices.timeFirstSessionTwo.end
                                      )}`}
                                  </Typography>
                                </div>
                              </div>
                            ))}
                          {week2.length > 0 &&
                            week2.map((day) => (
                              <div className={styles.schedule} key={day}>
                                <Typography
                                  sx={muiStyles.appointmentDays}
                                  variant="caption">
                                  {day}
                                </Typography>
                                <div className={styles.schedule__timing}>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeSecondSessionOne.start |
                                      docServices.timeSecondSessionOne.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeSecondSessionOne.start
                                      )} - ${convertTime(
                                        docServices.timeSecondSessionOne.end
                                      )}`}
                                  </Typography>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeSecondSessionTwo.start |
                                      docServices.timeSecondSessionTwo.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeSecondSessionTwo.start
                                      )} - ${convertTime(
                                        docServices.timeSecondSessionTwo.end
                                      )}`}
                                  </Typography>
                                </div>
                              </div>
                            ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <ThemeProvider theme={theme}>
                      <Link
                        href={`/doctors/${docDetails._id}/bookAppointment`}
                        passHref>
                        <Button size="small" variant="contained">
                          Book Appointment
                        </Button>
                      </Link>
                    </ThemeProvider>
                  </div>
                )
              }
              {
                docServices.inClinicFeeAvail && (
                  <div className={styles.appointment}>
                    <div>
                      <Typography sx={muiStyles.coloredText}>
                        InClinic Appointment
                      </Typography>
                      <div>
                        <Typography sx={muiStyles.opacity} variant="caption">
                          {docDetails.clinicName}
                        </Typography>
                      </div>
                      <Typography sx={muiStyles.opacity} variant="caption">
                        {docDetails.clinicAddress}
                      </Typography>
                    </div>
                    <Divider />
                    <div className={styles.appointment__fee}>
                      <Typography variant="body2">Fee</Typography>
                      <Typography variant="body2">
                        PKR {docServices.inClinicFee}
                      </Typography>
                    </div>
                    <Divider />
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header">
                        <Typography>{`${week1[0]} | ${convertTime(
                          docServices.timeFirstSessionOne.start
                        )} - ${convertTime(
                          docServices.timeFirstSessionOne.end
                        )}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.scheduleContainer}>
                          {week1.length > 0 &&
                            week1.map((day) => (
                              <div className={styles.schedule} key={day}>
                                <Typography
                                  sx={muiStyles.appointmentDays}
                                  variant="caption">
                                  {day}
                                </Typography>
                                <div className={styles.schedule__timing}>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeFirstSessionOne.start |
                                      docServices.timeFirstSessionOne.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeFirstSessionOne.start
                                      )} - ${convertTime(
                                        docServices.timeFirstSessionOne.end
                                      )}`}
                                  </Typography>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeFirstSessionTwo.start |
                                      docServices.timeFirstSessionTwo.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeFirstSessionTwo.start
                                      )} - ${convertTime(
                                        docServices.timeFirstSessionTwo.end
                                      )}`}
                                  </Typography>
                                </div>
                              </div>
                            ))}
                          {week2.length > 0 &&
                            week2.map((day) => (
                              <div className={styles.schedule} key={day}>
                                <Typography
                                  sx={muiStyles.appointmentDays}
                                  variant="caption">
                                  {day}
                                </Typography>
                                <div className={styles.schedule__timing}>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeSecondSessionOne.start |
                                      docServices.timeSecondSessionOne.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeSecondSessionOne.start
                                      )} - ${convertTime(
                                        docServices.timeSecondSessionOne.end
                                      )}`}
                                  </Typography>
                                  <Typography
                                    sx={muiStyles.opacity}
                                    variant="body2">
                                    {(docServices.timeSecondSessionTwo.start |
                                      docServices.timeSecondSessionTwo.end) !=
                                      0 &&
                                      `${convertTime(
                                        docServices.timeSecondSessionTwo.start
                                      )} - ${convertTime(
                                        docServices.timeSecondSessionTwo.end
                                      )}`}
                                  </Typography>
                                </div>
                              </div>
                            ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <ThemeProvider theme={theme}>
                      <Link
                        href={`/doctors/${docDetails._id}/bookAppointment`}
                        passHref>
                        <Button size="small" variant="contained">
                          Book Appointment
                        </Button>
                      </Link>
                    </ThemeProvider>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.appointmentContainerForPC}>
          {
            docServices.videoFeeAvail && (
              <div className={styles.appointment}>
                <Typography sx={muiStyles.coloredText}>
                  Online Virtual Appointment
                </Typography>
                <Divider />
                <div className={styles.appointment__fee}>
                  <Typography variant="body2">Fee</Typography>
                  <Typography variant="body2">PKR{docServices.videoFee}</Typography>
                </div>
                <Divider />
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header">
                    <Typography>{`${week1[0]} | ${convertTime(
                      docServices.timeFirstSessionOne.start
                    )} - ${convertTime(
                      docServices.timeFirstSessionOne.end
                    )}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.scheduleContainer}>
                      {week1.length > 0 &&
                        week1.map((day) => (
                          <div className={styles.schedule} key={day}>
                            <Typography
                              sx={muiStyles.appointmentDays}
                              variant="caption">
                              {day}
                            </Typography>
                            <div className={styles.schedule__timing}>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeFirstSessionOne.start |
                                  docServices.timeFirstSessionOne.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeFirstSessionOne.start
                                  )} - ${convertTime(
                                    docServices.timeFirstSessionOne.end
                                  )}`}
                              </Typography>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeFirstSessionTwo.start |
                                  docServices.timeFirstSessionTwo.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeFirstSessionTwo.start
                                  )} - ${convertTime(
                                    docServices.timeFirstSessionTwo.end
                                  )}`}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      {week2.length > 0 &&
                        week2.map((day) => (
                          <div className={styles.schedule} key={day}>
                            <Typography
                              sx={muiStyles.appointmentDays}
                              variant="caption">
                              {day}
                            </Typography>
                            <div className={styles.schedule__timing}>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeSecondSessionOne.start |
                                  docServices.timeSecondSessionOne.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeSecondSessionOne.start
                                  )} - ${convertTime(
                                    docServices.timeSecondSessionOne.end
                                  )}`}
                              </Typography>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeSecondSessionTwo.start |
                                  docServices.timeSecondSessionTwo.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeSecondSessionTwo.start
                                  )} - ${convertTime(
                                    docServices.timeSecondSessionTwo.end
                                  )}`}
                              </Typography>
                            </div>
                          </div>
                        ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <ThemeProvider theme={theme}>
                  <Link
                    href={`/doctors/${docDetails._id}/bookAppointment`}
                    passHref>
                    <Button size="small" variant="contained">
                      Book Appointment
                    </Button>
                  </Link>
                </ThemeProvider>
              </div>
            )
          }
          {
            docServices.inClinicFeeAvail && (
              <div className={styles.appointment}>
                <div>
                  <Typography sx={muiStyles.coloredText}>
                    InClinic Appointment
                  </Typography>
                  <div>
                    <Typography sx={muiStyles.opacity} variant="caption">
                      {docDetails.clinicName}
                    </Typography>
                  </div>
                  <Typography sx={muiStyles.opacity} variant="caption">
                    {docDetails.clinicAddress}
                  </Typography>
                </div>
                <Divider />
                <div className={styles.appointment__fee}>
                  <Typography variant="body2">Fee</Typography>
                  <Typography variant="body2">
                    PKR {docServices.inClinicFee}
                  </Typography>
                </div>
                <Divider />
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header">
                    <Typography>{`${week1[0]} | ${convertTime(
                      docServices.timeFirstSessionOne.start
                    )} - ${convertTime(
                      docServices.timeFirstSessionOne.end
                    )}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.scheduleContainer}>
                      {week1.length > 0 &&
                        week1.map((day) => (
                          <div className={styles.schedule} key={day}>
                            <Typography
                              sx={muiStyles.appointmentDays}
                              variant="caption">
                              {day}
                            </Typography>
                            <div className={styles.schedule__timing}>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeFirstSessionOne.start |
                                  docServices.timeFirstSessionOne.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeFirstSessionOne.start
                                  )} - ${convertTime(
                                    docServices.timeFirstSessionOne.end
                                  )}`}
                              </Typography>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeFirstSessionTwo.start |
                                  docServices.timeFirstSessionTwo.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeFirstSessionTwo.start
                                  )} - ${convertTime(
                                    docServices.timeFirstSessionTwo.end
                                  )}`}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      {week2.length > 0 &&
                        week2.map((day) => (
                          <div className={styles.schedule} key={day}>
                            <Typography
                              sx={muiStyles.appointmentDays}
                              variant="caption">
                              {day}
                            </Typography>
                            <div className={styles.schedule__timing}>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeSecondSessionOne.start |
                                  docServices.timeSecondSessionOne.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeSecondSessionOne.start
                                  )} - ${convertTime(
                                    docServices.timeSecondSessionOne.end
                                  )}`}
                              </Typography>
                              <Typography sx={muiStyles.opacity} variant="body2">
                                {(docServices.timeSecondSessionTwo.start |
                                  docServices.timeSecondSessionTwo.end) !=
                                  0 &&
                                  `${convertTime(
                                    docServices.timeSecondSessionTwo.start
                                  )} - ${convertTime(
                                    docServices.timeSecondSessionTwo.end
                                  )}`}
                              </Typography>
                            </div>
                          </div>
                        ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <ThemeProvider theme={theme}>
                  <Link
                    href={`/doctors/${docDetails._id}/bookAppointment`}
                    passHref>
                    <Button size="small" variant="contained">
                      Book Appointment
                    </Button>
                  </Link>
                </ThemeProvider>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { docName } = params;

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

  console.log(res.data);

  // Pass data to the page via props
  return {
    props: {
      docData: res.data,
    },
  };
}
