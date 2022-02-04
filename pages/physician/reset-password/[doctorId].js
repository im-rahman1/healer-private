import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Layout from "../../../components/Layout";
import styles from "../../../styles/reset-password.module.css";
import { theme } from "../../../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { API_URL } from "../../../config/reset-password";

import { Typography } from "@mui/material";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function ResetPassword() {
  const router = useRouter();
  const doctorId = router.query.doctorId;

  const [values, setValues] = useState({
    password1: "",
    password2: "",
  });
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    if (password1.value === password2.value) {
      if (password1.value.length && password2.value.length > 6) {
        return true;
      } else {
        setError("Password length should be larger than 6");
      }
    } else {
      setError("Enter passwords should be same.");
    }
  };

  // ${API_URL}/doctor/changePassword
  const handleFormSubmit = async () => {
    if (validate()) {
      setDisable(true);
      const response = await axios
        .post(`${API_URL}/doctor/changePassword`, {
          id: doctorId,
          password: password1.value,
        })
        .then((res) => {
          if (res.data === true) {
            router.push("/physician/verify");
          }
          // console.log(res.data);
        })
        .catch((error) => {
          if (error) {
            router.push("/physician/went-wrong");
          }
          // console.log("error");
        });
    }
  };

  return (
    <Layout
      title="Reset Password"
      description="robots"
      keywords="noindex, nofollow">
      <div className={styles.newPasswordForm}>
        <Typography className={styles.formHeading} variant="h5">
          Enter your new password!
        </Typography>
        <ThemeProvider theme={theme}>
          <FormControl sx={{ width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="password1" size="small">
              New Password
            </InputLabel>
            <OutlinedInput
              size="small"
              theme={theme}
              id="password1"
              type={showPassword ? "text" : "password"}
              value={values.password1}
              onChange={handleChange("password1")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="password2" size="small">
              Re-Enter New Password
            </InputLabel>
            <OutlinedInput
              id="password2"
              size="small"
              type={showPassword ? "text" : "password"}
              value={values.password2}
              onChange={handleChange("password2")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Re-Enter New Password"
            />
          </FormControl>
        </ThemeProvider>
        {error && <span className={styles.error}>{error}</span>}
        <ThemeProvider theme={theme}>
          <Button
            className={styles.btn}
            onClick={() => handleFormSubmit()}
            disabled={disable}
            variant="contained">
            Submit
          </Button>
        </ThemeProvider>
      </div>
    </Layout>
  );
}
