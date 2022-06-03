import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/bookAppointment.module.css";
import axios from "axios";
import { API_URL } from "@/config/config";
import { useRouter } from "next/router";

// mui
import {
  Typography,
  Breadcrumbs,
  Avatar,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert, Skeleton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MuiPhoneNumber from "material-ui-phone-number";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useUserAuth } from "context/authContext";
import { getCookie } from "hooks/useCookies.";

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

function convertTime(time) {
  let t = time.split(":");
  let ending = ":AM";
  if (t[0] >= 12) {
    if (t[0] != 24) {
      ending = ":PM";
    }
  }
  if (t[0] > 12) {
    t[0] = t[0] - 12;
  }
  if (t[1] <= 9) {
    t[1] = `0${t[1]}`;
  }

  let formattedTime = `${t[0]}:${t[1]}${ending}`;
  return formattedTime;
}

function timeWithZeros(time) {
  if (time <= 9) {
    return `0${time}:00`;
  } else if (time == "00") {
    return `24:00`;
  } else {
    return `${time}:00`;
  }
}

function makeSlots(sTime, duration, eTime, day) {
  const arr = [];

  // startTime
  const _st = new Date();
  _st.setHours(sTime.split(":")[0]);
  _st.setMinutes(sTime.split(":")[1]);
  const stt = _st.getTime();

  // currentTime
  const _ct = new Date();
  _ct.setMinutes(_ct.getMinutes() + 40);
  const ctt = _ct.getTime();

  // endTime
  const _et = new Date();
  _et.setHours(eTime.split(":")[0]);
  _et.setMinutes(eTime.split(":")[1]);
  // const et = `${_et.getHours()}:${_et.getMinutes()}`;
  const ett = _et.getTime() - 10 * 60000;

  // 24th Hour
  const _24 = new Date();
  _24.setHours("00");
  const h24 = `${_24.getHours()}:${_24.getMinutes()}`;

  const now = new Date();
  const dateInArr = now.toString().split(" ");
  const fDate = `${dateInArr[0]}, ${dateInArr[1]} ${dateInArr[2]}`;

  // console.log(fDate)

  if (day == fDate) {
    let arrOfCtt = [];
    let arrOfStt = [];
    if (ctt > stt) {
      let increament1 = 0;
      for (let i = 0; (i = true); i++) {
        var nextTime = new Date(ctt + increament1 * 60000);
        var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;

        if (nextSlot <= h24) {
          break;
        }
        if (nextTime > ett) {
          break;
        }

        arrOfCtt.push(nextSlot);
        increament1 = increament1 + duration;
      }

      let increament2 = 0;
      for (let i = 0; (i = true); i++) {
        var nextTime = new Date(stt + increament2 * 60000);
        var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;

        if (nextSlot <= h24) {
          break;
        }
        if (nextTime > ett) {
          break;
        }

        arrOfStt.push(nextSlot);
        increament2 = increament2 + duration;
      }
      for (let i = 0; i < arrOfCtt.length; i++) {
        const stime = new Date();
        const tSlot1 = arrOfCtt[i].split(":");
        stime.setHours(tSlot1[0]);
        stime.setMinutes(tSlot1[1]);

        for (let j = 0; j < arrOfStt.length; j++) {
          const ctime = new Date();
          const tSlot2 = arrOfStt[j].split(":");
          ctime.setHours(tSlot2[0]);
          ctime.setMinutes(tSlot2[1]);

          if (stime.getTime() < ctime.getTime()) {
            arr.push(
              `${convertTime(`${ctime.getHours()}:${ctime.getMinutes()}`)}`
            );
            break;
          }
        }
      }

      // console.log("ctt > stt");
    } else if (ctt > ett) {
      return arr;
    } else if (ctt < ett) {
      let increament = 0;
      for (let i = 0; (i = true); i++) {
        var nextTime = new Date(stt + increament * 60000);
        var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;

        if (nextSlot <= h24) {
          break;
        }
        if (nextTime > ett) {
          break;
        }

        arr.push(convertTime(nextSlot));
        increament = increament + duration;
      }
      // console.log("ctt !> stt");
    }
    // console.log("sameDay");
  } else {
    let increament = 0;
    for (let i = 0; (i = true); i++) {
      var nextTime = new Date(stt + increament * 60000);
      var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;

      if (nextSlot <= h24) {
        break;
      }
      if (nextTime > ett) {
        break;
      }

      arr.push(convertTime(nextSlot));
      increament = increament + duration;
    }
    // console.log("anotherDay");
  }

  return arr;
}

export default function BookAppointment() {
  const router = useRouter();
  const { docSlug } = router.query;

  const [useer, setUseer] = useState(null);
  const type = 'virtual';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUseer(_user);
      }
    });

    return () => {
      unsubscribe();
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [doc, setDoc] = useState(null);
  const [docDetails, setDocDetails] = useState(null);
  const [docServices, setDocServices] = useState(null);

  const [appointmentType, setAppointmentType] = useState(null);
  const [callType, setCallType] = useState("video");
  const [isFree, setIsFree] = useState(null);
  // const [bookedSlots, setBookedSlots] = useState(null);

  const [open, setOpen] = useState(false);
  const [logInDialogOpen, setLogInDialogOpen] = useState(false);

  const [alert, setAlert] = useState({
    severity: "",
    msg: "",
    btnLink: "",
    btnName: "",
  });

  const [week1, setWeek1] = useState(null);
  const [week2, setWeek2] = useState(null);
  const [days, setDays] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [slots, setSlots] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientName, setPatientName] = useState("");

  // state For LogIn
  const { user, signIn, verifyOtp, sendUser, getCreds } = useUserAuth();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
  });

  const getDoc = async () => {
    // console.log(docSlug);
    await axios.post(`${API_URL}/doctor/getDocDataBySlug`, {
      "docSlug": docSlug,
    }).then((res) => {
      // console.log(res.data)
      setDocDetails(res.data.doctor)
      setDocServices(res.data.practice)
      setDoc(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    if(docSlug) {
      getDoc();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docSlug])

  function showDays() {
    // extractDays
    const weekFirst = docServices.weekFirst;
    const weekSecond = docServices.weekSecond;
    let daysOfWeek1 = Object.keys(weekFirst).filter((key) => weekFirst[key]);
    let daysOfWeek2 = Object.keys(weekSecond).filter((key) => weekSecond[key]);

    // daysInNext10Days
    const daysInNext10Days = [];
    const arrOfDays = [...daysOfWeek1, ...daysOfWeek2];
    let i = 0;
    while (i < 10) {
      let today = new Date();
      let date = new Date();
      date.setFullYear(today.getFullYear());
      date.setMonth(today.getMonth());
      date.setDate(today.getDate() + i);

      const dateInArr = date.toString().split(" ");

      const formattedDate = `${dateInArr[0]}, ${dateInArr[1]} ${dateInArr[2]}`;

      if (arrOfDays.includes(dateInArr[0])) {
        daysInNext10Days.push(formattedDate);
      }
      i++;
    }
    setWeek1(daysOfWeek1);
    setWeek2(daysOfWeek2);
    setDays(daysInNext10Days);
  }

  function filterSlots(bookedSlots, _slots) {
    const bkedSlots = bookedSlots;

    for (let i = 0; i < bkedSlots.length; i++) {
      if (_slots.includes(bkedSlots[i])) {
        const indexOfSlot = _slots.indexOf(bkedSlots[i]);
        if (indexOfSlot > -1) {
          _slots.splice(indexOfSlot, 1);
        }
      }
    }

    setFilteredSlots(_slots);
  }

  function getBookedSlots(dayWithDate, __slots) {
    const now = new Date();
    const day = dayWithDate.split(",")[0];
    const mnth = dayWithDate.split(" ")[1];
    const dte = dayWithDate.split(" ")[2];
    const fDate = `${day},${mnth} ${dte},${now.getFullYear()}`;
    const patientId = String(localStorage.getItem("errorBackoff_P"))
      .split("")
      .reverse()
      .join("");

    axios
      .post(`${API_URL}/appointment/forPatient`, {
        doctorID: docDetails._id,
        dateTime: fDate,
        patientID: patientId,
      })
      .then((res) => {
        // console.log(res.data);
        setIsFree(res.data.free);
        const arr = [];
        if (res.data.appointments.length > 0) {
          for (let i = 0; i < res.data.appointments.length; i++) {
            arr.push(res.data.appointments[i].time);
          }
          // setBookedSlots(arr);
        }
        filterSlots(arr, __slots);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDayClick(dayWithDate) {
    setFilteredSlots(null);
    setSelectedDay(dayWithDate);
    let _slots = [];

    // Check whether the given day is from week1 or week2
    // OR
    // whether the appointment type is inClinic or virtual
    var day = dayWithDate.split(",")[0] || "";
    if (week1.includes(day)) {
      if (appointmentType == "video") {
        _slots = makeSlots(
          timeWithZeros(docServices.timeFirstSessionOne.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeFirstSessionOne.end),
          dayWithDate
        );
      } else if (appointmentType == "inClinic") {
        _slots = makeSlots(
          timeWithZeros(docServices.timeFirstSessionTwo.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeFirstSessionTwo.end),
          dayWithDate
        );
      }
    } else if (week2.includes(day)) {
      if (appointmentType == "video") {
        _slots = makeSlots(
          timeWithZeros(docServices.timeSecondSessionOne.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeSecondSessionOne.end),
          dayWithDate
        );
      } else if (appointmentType == "inClinic") {
        _slots = makeSlots(
          timeWithZeros(docServices.timeSecondSessionTwo.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeSecondSessionTwo.end),
          dayWithDate
        );
      }
    }
    setSlots(_slots);
    getBookedSlots(dayWithDate, _slots);
  }

  function handleTimeClick(time) {
    // console.log(time);
    // console.log(selectedDay);
    setSelectedTime(time);

    const now = new Date();
    const day = selectedDay.split(",")[0];
    const mnth = selectedDay.split(" ")[1];
    const dte = selectedDay.split(" ")[2];
    const fDate = `${day}, ${mnth} ${dte}, ${now.getFullYear()}`;

    axios
      .post(`${API_URL}/appointment/checkSlotAvailability`, {
        doctorID: docDetails._id,
        dateTime: fDate,
        Time: time,
      })
      .then((res) => {
        if (res.data) {
          let slots_ = filteredSlots;
          const indx = slots_.indexOf(time);
          if (indx > -1) {
            slots_.splice(indx, 1);
          }
          setSelectedTime(null);
          setFilteredSlots(slots_);
          setAlert({
            severity: "error",
            msg: "Time already booked, Try Another.",
            btnLink: "",
            btnName: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckBox(type) {
    setCallType(type);
  }

  function bookAppointment() {
    if (user) {
      let dateAdded = selectedDay ? true : false;
      let timeAdded = selectedTime ? true : false;
      let patientNameAdded = false;
      let callTypeAdded;

      if (appointmentType == "inClinic") {
        callTypeAdded = true;
      } else {
        callTypeAdded = callType ? true : false;
      }

      if (patientName) {
        patientNameAdded = true;
      } else {
        patientNameAdded = false;
      }

      // console.log(patientNameAdded)

      if (dateAdded & timeAdded & patientNameAdded & callTypeAdded) {
        const now = new Date();
        const day = selectedDay.split(",")[0];
        const mnth = selectedDay.split(" ")[1];
        const dte = selectedDay.split(" ")[2];

        const fDate = `${day},${mnth} ${dte},${now.getFullYear()}`;
        const patientId = String(localStorage.getItem("errorBackoff_P"))
          .split("")
          .reverse()
          .join("");

        const patientPhone = String(localStorage.getItem("proactiveRefresh_p"))
          .split("")
          .reverse()
          .join("");

        axios
          .post(`${API_URL}/appointment/add`, {
            doctorID: docDetails._id,
            doctorName: docDetails.fullName,
            doctorTitle: docDetails.title,
            doctorType: docDetails.practiceDomain,
            doctorCity: docDetails.city,
            doctorImageURL: docDetails.profileImage,
            patientName: patientName,
            patientID: patientId,
            dateTime: fDate,
            time: selectedTime,
            report: [],
            isAudioCall: callType == "audio" ? true : false,
            appointmentType: appointmentType,
            fee:
              appointmentType == "virtual"
                ? docServices.videoFee
                : docServices.inClinicFee,
            appDuration: 10,
            patientContact: patientPhone,
            doctorContact: docDetails.phoneNumber,
            clinicAddress: docDetails.clinicAddress,
            clinicName: docDetails.clinicName,
            clinicLongitude: docDetails.longitude,
            clinicLatitude: docDetails.latitude,
          })
          .then((res) => {
            setAlert({
              severity: "success",
              msg: `You have booked an apointment on ${selectedDay} at ${selectedTime} for ${patientName}. For Further Process, Download the App Now.`,
              btnLink:
                "https://play.google.com/store/apps/details?id=com.healer.nature",
              btnName: "Download App",
            });
            setOpen(true);
            handleDayClick(days[0]);
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setAlert({
          severity: "error",
          msg: "Please Enter all credentials.",
          btnLink: "",
          btnName: "",
        });
        setOpen(true);
      }
    } else {
      // setAlert({
      //   severity: "error",
      //   msg: "LogIn Or SignUp to book an Appointment.",
      //   btnLink: '/logIn',
      //   btnName: 'LogIn',
      // })
      setLogInDialogOpen(true);
    }
  }

  // functions for LogIn dialog
  const sendOtp = async () => {
    const ph = credentials.phone;
    const countryCode = ph.split(" ")[0];
    const prefix = ph.split(" ")[1].split("-")[0];
    const sufix = ph.split(" ")[1].split("-")[1];
    const fPhone = `${countryCode}${prefix}${sufix}`;
    localStorage.setItem(
      "proactiveRefresh_p",
      fPhone.split("").reverse().join("")
    );
    localStorage.setItem(
      "proactiveRefresh_n",
      String(credentials.name).split("").reverse().join("")
    );

    setError(null);
    // console.log('sendOtp Called');
    setLoading(true);
    await signIn(credentials.phone)
      .then((res) => {
        // console.log(res);
        setOtpSent(true);
        setLoading(false);
        // location.reload();
      })
      .catch((err) => {
        // setError('Something went wrong, Try Later.');
        console.log("err:", err);
        setLoading(false);
      });
  };

  function handleOnChange(value) {
    setCredentials({ ...credentials, phone: value });
    setError(null);
  }

  function confirmOTP() {
    if (!otp) return;
    setLoading(true);
    verifyOtp(otp)
      .then((res) => {
        // console.log(res);
        setLogInDialogOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    let appointmentType = getCookie('appointmentType');
    setAppointmentType(appointmentType);
    // console.log("appointmentType", appointmentType);

    if(!appointmentType) {
      router.push("/doctors");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(docServices) {
      showDays();
    }

    if (user) {
      setPatientName(
        String(localStorage.getItem("proactiveRefresh_n"))
          .split("")
          .reverse()
          .join("")
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docServices]);

  useEffect(() => {
    if (days) {
      handleDayClick(days[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  // console.log(doc)
  // console.log(docDetails)
  // console.log(docServices)
  // console.log(week1)
  // console.log(week2)
  // console.log(days)
  // console.log(selectedDay);
  // console.log(selectedTime);
  // console.log("slots", slots);
  // console.log(isFree)
  // console.log(bookedSlots)
  // console.log("filtered", filteredSlots);
  // console.log(callType);

  return (
    (docServices) ? (
      <Layout title="Book Appointment">
        <ThemeProvider theme={theme}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
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
    <Link
      href={`/doctors/${docDetails.docSlug}`}
      key="1"
      color="inherit"
      passHref>
      <Typography variant="caption" sx={muiStyles.link}>
        {`${docDetails.title} ${docDetails.fullName}`}
      </Typography>
    </Link>,
    <Typography variant="caption" key="3" color="text.primary">
      Book Appointment
    </Typography>
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
              <Typography sx={{ margin: "0.6rem" }}>Book Appointment</Typography>
              <div className={styles.daySlotContainer}>
                {days &&
                  days.map((day, i) => (
                    <div
                      key={i}
                      className={
                        selectedDay == day
                          ? styles.daySlotSelected
                          : styles.daySlot
                      }
                      onClick={() => handleDayClick(day)}>
                      <Typography>{day}</Typography>
                    </div>
                  ))}
              </div>
              <Divider sx={{ margin: "0.7rem" }} />
              {filteredSlots ? (
                <div className={styles.timeSlotContainer}>
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot, i) => (
                      <span
                        key={i}
                        className={
                          selectedTime == slot
                            ? styles.timeSlotSelected
                            : styles.timeSlot
                        }
                        onClick={() => {
                          handleTimeClick(slot);
                        }}>
                        <Typography>{slot}</Typography>
                      </span>
                    ))
                  ) : (
                    <div className={styles.response}>
                      <Typography variant="h6">No Slots Available.</Typography>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.loadingContainer}>
                  <div className={styles.loading}></div>
                </div>
              )}
  
              <div className={styles.appointmentFooter}>
                <div className={styles.checkBoxContainer}>
                  <div className={styles.patientName}>
                    <TextField
                      value={patientName}
                      label="Patient Name"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                  {appointmentType != "inClinic" && (
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
                  )}
                </div>
                <div className={styles.bookBt}>
                  <div className={styles.pricing}>
                    {isFree == 0 ? (
                      <div className={styles.free}>
                        <LocalOfferIcon
                          sx={{ color: "#01a22e", fontSize: "2rem" }}
                        />
                        <div>
                          <Typography sx={{ color: "#717171" }}>
                            1st Free
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "#01a22e",
                            }}>
                            PKR
                            {appointmentType == "virtual"
                              ? docServices.videoFee
                              : docServices.inClinicFee}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.paid}>
                        <LocalOfferIcon
                          sx={{ color: "#01a22e", fontSize: "1.2rem" }}
                        />
                        <Typography variant="body1" sx={{ color: "#01a22e" }}>
                          PKR
                          {appointmentType == "virtual"
                            ? docServices.videoFee
                            : docServices.inClinicFee}
                        </Typography>
                      </div>
                    )}
                  </div>
                  <Button
                    disabled={!selectedTime}
                    onClick={bookAppointment}
                    sx={{ width: "300px" }}
                    size="small"
                    variant="contained">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"></DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div>
                  <Alert severity={alert.severity || "info"}>{alert.msg}</Alert>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(!open)} autoFocus>
                OK
              </Button>
              {alert.btnName && (
                <Link href={alert.btnLink} passHref>
                  <Button>{alert.btnName}</Button>
                </Link>
              )}
            </DialogActions>
          </Dialog>
          <Dialog
            open={logInDialogOpen}
            // onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">LogIn</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div>
                  <div className={styles.loginPage}>
                    {!otpSent && (
                      <div className={styles.loginForm}>
                        <TextField
                          onChange={(e) => {
                            setCredentials({
                              ...credentials,
                              name: e.target.value,
                            }),
                              setError(null);
                          }}
                          label="Name"
                          variant="outlined"
                          size="small"
                          value={credentials.name || ""}
                        />
                        <div styles={{width: '300px'}}>
                          <MuiPhoneNumber
                            sx={{width: "300px"}}
                            value={credentials.phone}
                            defaultCountry={"pk"}
                            onChange={handleOnChange}
                            variant="outlined"
                            size="small"
                            label="Phone Number"
                          />
                        </div>
                        <div id="sign-in-button"></div>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                          variant="contained"
                          disabled={loading}
                          onClick={() => {
                            sendOtp(), getCreds();
                          }}>
                          Send OTP
                        </Button>
                      </div>
                    )}
                    {otpSent && (
                      <div className={styles.loginForm}>
                          <TextField
                            onChange={(e) => {
                              setOtp(e.target.value), setError(null);
                            }}
                            label=" Enter OTP"
                            variant="outlined"
                            size="small"
                            value={otp}
                          />
                        {error && <Alert severity="error">{error}</Alert>}
                        <div className={error}></div>
                        <Button
                          variant="contained"
                          disabled={loading}
                          onClick={() => {
                            confirmOTP(), sendUser();
                          }}>
                          LogIn
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setLogInDialogOpen(!logInDialogOpen)}
                autoFocus>
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </Layout>
    ) : (
        <Layout title="book Appointment">
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
              <Skeleton variant="rectangular" height={350} />
            </div>
          </div>
        </Layout>

    )
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { docSlug } = params;

//   // console.log(docName);
//   // console.log(type);

//   const res = await axios.post(`${API_URL}/doctor/getDocDataBySlug`, {
//     docSlug: docSlug,
//   });

//   // if (!res) {
//   //   return {
//   //     redirect: {
//   //       destination: '/login',
//   //       permanent: false,
//   //   }
//   //   }
//   // }

//   // console.log(res.data);

//   // Pass data to the page via props
//   return {
//     props: {
//       docData: res.data,
//     },
//   };
// }
