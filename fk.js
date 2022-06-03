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
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useUserAuth } from "context/authContext";

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

export default function BookAppointment({ docData, type }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (_user) => {
  //     if(_user) {
  //       setCurrentUser(_user);
  //     } else {
  //       router.push("/logIn");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const [doc, setDoc] = useState({ ...docData });
  const [week1, setWeek1] = useState([]);
  const [week2, setWeek2] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDaySlot, setSelectedDaySlot] = useState("");
  const [callType, setCallType] = useState("");
  const [appointmentType, setAppoitmentType] = useState(type);
  const [slots, setSlots] = useState([]);
  const [days, setDays] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isFree, SetIsFee] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [filteredSlots, setFilteredSlots] = useState([]);

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

  function daysInNext10Days(arrOfDays) {
    const arr = [];

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
        arr.push(formattedDate);
      }
      i++;
    }
    return arr;
    console.log(arr);
  }

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

  function mapTime(sTime, duration, eTime) {
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

    const now = new Date;
    const dateInArr = now.toString().split(" ");
    const fDate = `${dateInArr[0]}, ${dateInArr[1]} ${dateInArr[2]}`;

    // console.log(fDate);
    // console.log(arrOfStt);
    // console.log(arrOfCtt);

    if (selectedDaySlot == fDate) {
      let arrOfCtt = [];
      let arrOfStt = [];

      if (ctt > stt) {
        let increament1 = 0;
        for (let i = 0; (i = true); i++) {
          var nextTime = new Date(ctt + increament1 * 60000);
          var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;
          
          if(nextSlot <= h24) {
            break;
          }
          if(nextTime > ett ) {
            break;
          }
          
          arrOfCtt.push(nextSlot);
          increament1 = increament1 + duration;
        }

        let increament2 = 0;
        for(let i = 0; i = true; i++) {
          var nextTime = new Date(stt + increament2*60000);
          var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;
          
          if(nextSlot <= h24) {
            break;
          }
          if(nextTime > ett ) {
            break;
          }

          arrOfStt.push(nextSlot);
          increament2 = increament2 + duration;
          
        }
        // console.log(arr);

        for(let i = 0; i<arrOfCtt.length; i++) {
          const stime = new Date();
          const tSlot1 = arrOfCtt[i].split(":");
          stime.setHours(tSlot1[0]);
          stime.setMinutes(tSlot1[1]);

          for(let j=0; j<arrOfStt.length; j++) {
            const ctime = new Date();
            const tSlot2 = arrOfStt[j].split(":");
            ctime.setHours(tSlot2[0]);
            ctime.setMinutes(tSlot2[1]);

            if(stime.getTime() < ctime.getTime()) {
              arr.push(`${convertTime(`${ctime.getHours()}:${ctime.getMinutes()}`)}`)
              break;
            }
          }
        }
      }
      else {
        let increament = 0;
        for(let i = 0; i = true; i++) {
          var nextTime = new Date(stt + increament*60000);
          var nextSlot = `${nextTime.getHours()}:${nextTime.getMinutes()}`;
          
          if(nextSlot <= h24) {
            break;
          }
          if(nextTime > ett ) {
            break;
          }
          
          arr.push(convertTime(nextSlot));
          increament = increament + duration;
        }
      }
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
    }
    return arr;
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

  const handleCheckBox = (type) => {
    setCallType(type);
  };

  const generateSlotsOfDay = () => {
    const dayWithDate = selectedDaySlot;
    // let _slots = [];

    if (selectedDaySlot) {
      var day = dayWithDate.split(",")[0] || "";
    }

    // console.log(day);
    if (week1.includes(day)) {
      if (type == "video") {
        let _slots = mapTime(
          timeWithZeros(docServices.timeFirstSessionOne.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeFirstSessionOne.end)
        );
        setSlots(_slots);
      } else if (type == "inClinic") {
        let _slots = mapTime(
          timeWithZeros(docServices.timeFirstSessionTwo.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeFirstSessionTwo.end)
        );
        setSlots(_slots);
      }
    } else if (week2.includes(day)) {
      if (type == "video") {
        let _slots = mapTime(
          timeWithZeros(docServices.timeSecondSessionOne.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeSecondSessionOne.end)
        );
        setSlots(_slots);
      } else if (type == "inClinic") {
        let _slots = mapTime(
          timeWithZeros(docServices.timeSecondSessionTwo.start),
          docServices.timeDuration,
          timeWithZeros(docServices.timeSecondSessionTwo.end)
        );
        setSlots(_slots);
      }
    }

    // console.log(slots);
  };

  const getBookedSlots = () => {
    const now = new Date();

    const day = selectedDaySlot.split(",")[0];
    const mnth = selectedDaySlot.split(" ")[1];
    const dte = selectedDaySlot.split(" ")[2];

    const fDate = `${day}, ${mnth} ${dte}, ${now.getFullYear()}`;
    const patientID = String(localStorage.getItem("errorBackoff_P"))
      .split("")
      .reverse()
      .join("");
    // console.log(fDate);

    axios
      .post(`${API_URL}/appointment/forPatient`, {
        doctorID: docDetails._id,
        dateTime: fDate,
        patientID: patientID,
      })
      .then((res) => {
        // setBookedSlots(res.data.appointments);
        if(res.data.appointments.length > 0) {
          const arr = [];
          for(let i=0; i<res.data.appointments.length; i++) {
            arr.push(res.data.appointments[i].time);
          }
          setBookedSlots(arr);
        }
        SetIsFee(res.data.free);
        console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const filterSlots = () => {
    // getBookedSlots();
    // let filteredSlots = [];
    // const bkedSlots = [
    //   "11:00:PM",
    //   "11:30:PM",
    //   "6:20:AM",
    //   "11:10:AM"
    // ];

    const bkedSlots = bookedSlots;

    console.log(bkedSlots)
    const realSlots = slots;
    
    for(let i=0; i<bkedSlots.length; i++) {
      if(realSlots.includes(bkedSlots[i])){
        const indexOfSlot = realSlots.indexOf(bkedSlots[i]);
        if (indexOfSlot > -1) {
          realSlots.splice(indexOfSlot, 1); 
        }
      }
    }

    // console.log(realSlots)
    setFilteredSlots(realSlots);

  };

  const checkSlotAvailability = () => {
    const now = new Date();
    const day = selectedDaySlot.split(",")[0];
    const mnth = selectedDaySlot.split(" ")[1];
    const dte = selectedDaySlot.split(" ")[2];
    const fDate = `${day}, ${mnth} ${dte}, ${now.getFullYear()}`;

    axios.post(`${API_URL}/appointment/checkSlotAvailability`, {
      doctorID: docDetails._id,
      dateTime: fDate,
      Time: selectedTimeSlot
    }).then(res => {
      if(res.data) {
        // console.log(res.data);
        let slotss = filteredSlots;
        const indx = slotss.indexOf(selectedTimeSlot);
        if (indx > -1) {
          slotss.splice(indx, 1); 
        }
        alert('Time already booked, Try Another.');
        setFilteredSlots(slotss);
        // console.log(slotss);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const bookAppointment = () => {
    const now = new Date();
    const day = selectedDaySlot.split(",")[0];
    const mnth = selectedDaySlot.split(" ")[1];
    const dte = selectedDaySlot.split(" ")[2];

    const fDate = `${day},${mnth} ${dte},${now.getFullYear()}`;
    const patientID = String(localStorage.getItem("errorBackoff_P"))
      .split("")
      .reverse()
      .join("");    

    const patientPhone = String(localStorage.getItem("proactiveRefresh_p"))
    .split("")
    .reverse()
    .join("");   
    
    console.log(patientPhone);
    

    axios.post(`${API_URL}/appointment/add`, {
      doctorID: docDetails._id,
      doctorName: docDetails.fullName,
      doctorTitle: docDetails.title,
      doctorType: docDetails.practiceDomain,
      doctorCity: docDetails.city,
      doctorImageURL: docDetails.profileImage,
      patientName: patientName,
      patientID: patientID,
      dateTime: fDate,
      time: selectedTimeSlot,
      report: [],
      isAudioCall: false,
      appointmentType: appointmentType,
      fee: appointmentType == "virtual" ? docServices.videoFee : docServices.inClinicFee,
      appDuration: 10,
      patientContact: patientPhone,
      doctorContact: docDetails.phoneNumber,
      clinicAddress: docDetails.clinicAddress,
      clinicName: docDetails.clinicName,
      clinicLongitude: docDetails.longitude,
      clinicLatitude: docDetails.latitude
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

  }

  // initial render
  useEffect(() => {
    extractDays();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDays(daysInNext10Days([...week1, ...week2]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week1, week2]);

  useEffect(() => {
    setSelectedDaySlot(days[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  useEffect(() => {
    generateSlotsOfDay();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDaySlot]);
  
  useEffect(() => {
    getBookedSlots();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  useEffect(() => {
    filterSlots();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookedSlots]);

  useEffect(() => {
    checkSlotAvailability();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeSlot])

  // console.log(doc);
  // console.log(docDetails);
  // console.log(docServices);
  // console.log("days", days);
  // console.log(selectedDaySlot);
  // console.log(week1);
  // console.log(week2);
  // console.log("booked",bookedSlots);
  console.log("slots",slots);
  // console.log(isFree);
  // console.log(selectedTimeSlot);
  // console.log("filtered",filteredSlots);
  // console.log(patientName);
  // console.log(patientPhone);

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
            <Typography sx={{ margin: "0.6rem" }}>Book Appointment</Typography>
            <div className={styles.daySlotContainer}>
              {days.map((day, i) => (
                <div
                  key={i}
                  className={
                    selectedDaySlot == `${days[i]}`
                      ? styles.daySlotSelected
                      : styles.daySlot
                  }
                  onClick={() => setSelectedDaySlot(days[i])}>
                  <Typography>{day}</Typography>
                </div>
              ))}
            </div>
            <Divider sx={{ margin: "0.7rem" }} />
            {slots.length > 0 ? (
              <div className={styles.timeSlotContainer}>
                {filteredSlots.map((slot, i) => (
                  <span
                    key={i}
                    className={
                      selectedTimeSlot == `${slots[i]}`
                        ? styles.timeSlotSelected
                        : styles.timeSlot
                    }
                    onClick={() => {setSelectedTimeSlot(slots[i])}}>
                    <Typography>{slot}</Typography>
                  </span>
                ))}
              </div>
            ) : (
              <div className={styles.errMsg}>
                <Typography variant="h6">No Slots Available</Typography>
              </div>
            )}
            <div className={styles.appointmentFooter}>
              <div className={styles.checkBoxContainer}>
                <div className={styles.patientName}>
                  <TextField
                    onChange={(e) => {
                      setPatientName(e.target.value);
                    }}
                    label="Patient Name"
                    variant="outlined"
                    size="small"
                    value={patientName}
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
                  onClick={() => bookAppointment()}
                  sx={{ width: "300px" }}
                  size="small"
                  variant="contained">
                  Book Appointment
                </Button>
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
  const { docName, type } = params;

  // console.log(docName);
  console.log(type);

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
      type,
    },
  };
}
