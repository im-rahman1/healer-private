import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/login.module.css";
import Layout from "@/components/Layout";
import axios from "axios";

import { Button, TextField, Alert } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { useRouter } from "next/router";
import MuiPhoneNumber from "material-ui-phone-number";
import { useUserAuth } from "context/authContext";
import firebase from "firebase/app";

export default function LoginForm() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [useer, setUseer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
  });

  const { user, signIn, verifyOtp, sendUser, getCreds } = useUserAuth();

  // console.log(user);

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
      })
      .catch((err) => {
        // setError('Something went wrong, Try Later.');
        console.log("err:", err);
        setLoading(false);
      });
  };

  const setCreds = () => {
    // const ph = "+92 322-4885945";
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
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(credentials);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentuser) => {
      if (currentuser) {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className={styles.loginPage}>
          {/* <Button onClick={() => sendUser()}>sendUser</Button>
          <Button onClick={() => setCreds()}>setCreds</Button> */}
          {!otpSent && (
            <div className={styles.loginForm}>
              <TextField
                onChange={(e) => {
                  setCredentials({ ...credentials, name: e.target.value }),
                    setError(null);
                }}
                label="Name"
                variant="outlined"
                size="small"
                value={credentials.name || ""}
              />
              <MuiPhoneNumber
                value={credentials.phone}
                defaultCountry={"pk"}
                onChange={handleOnChange}
                variant="outlined"
                size="small"
                label="Phone Number"
              />
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
      </ThemeProvider>
    </Layout>
  );
}
