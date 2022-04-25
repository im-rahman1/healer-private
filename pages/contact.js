import Layout from "@/components/Layout";
import styles from "@/styles/contact.module.css";

import {
  TextField,
  Button,
  FormControl,
  Typography,
  Alert,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/config/config";
import { LoadingButton } from "@mui/lab";

export default function Contact() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    respond: false,
  });
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
    setError(false);
    setSaved(false);
  };

  const handleSubmit = () => {
    if (
      data.name.length > 2 &&
      data.phone.length > 5 &&
      data.email.length > 5 &&
      data.message.length > 2
    ) {
      // console.log(data);
      setLoading(true);
      setError(false);
      axios
        .post(`${API_URL}/ContactUs/newSubmition`, {
          ...data,
        })
        .then((res) => {
          setSaved(true);
          setError(false);
          setLoading(false);
          setData({
            name: "",
            phone: "",
            email: "",
            message: "",
            respond: false,
          });
          // console.log("true");
        })
        .catch((err) => {
          setSaved(false);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setSaved(false);
      // console.log("empty");
    }
  };

  // console.log(data);

  return (
    <Layout title="Contact us">
      <ThemeProvider theme={theme}>
        <div className={styles.contactPage}>
          <div className={styles.contactForm}>
            <div className={styles.txtFields}>
              <TextField
                value={data.name || ""}
                onChange={handleChange("name")}
                id="name"
                label="Name"
                size="small"
              />
              <TextField
                value={data.phone || ""}
                onChange={handleChange("phone")}
                id="phone"
                label="Phone"
                size="small"
              />
              <TextField
                value={data.email || ""}
                onChange={handleChange("email")}
                id="email"
                label="Email"
                size="small"
              />
              <TextField
                value={data.message || ""}
                size="small"
                id="message"
                label="Message"
                multiline
                rows={4}
                onChange={handleChange("message")}
              />
            </div>
            <div className={error ? styles.error : styles.notError}>
              <Alert severity="error">Enter valid data!</Alert>
            </div>
            {saved && (
              <Alert sx={{ marginTop: "10px" }} severity="success">
                Submitted
              </Alert>
            )}
            <LoadingButton
              loading={loading}
              onClick={handleSubmit}
              variant="contained"
              size="small"
              sx={{ width: "90px", marginTop: "20px" }}>
              Submit
            </LoadingButton>
          </div>
          <div className={styles.links}>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              General Inquery
            </Typography>

            <Typography variant="body2" sx={{ color: "#01a22e" }}>
              <a href="mailto:info@healer.pk">info@healer.pk</a>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              Unani Medicine
            </Typography>
            <Typography variant="body2" sx={{ color: "#01a22e" }}>
              <a href="mailto:pharmacy@healer.pk">pharmacy@healer.pk</a>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              WhatsApp
            </Typography>
            <Typography variant="body2" sx={{ color: "#01a22e" }}>
              <a href="https://api.whatsapp.com/send/?phone=923011661118&text&app_absent=0">
                +923011661118
              </a>
            </Typography>
          </div>
        </div>
      </ThemeProvider>
    </Layout>
  );
}
