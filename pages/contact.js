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

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
    setError(false);
    setSaved(false);
  };

  const handleSubmit = () => {
    if (
      data.name.length > 3 &&
      data.phone.length > 7 &&
      data.email.length > 12 &&
      data.message.length > 10
    ) {
      console.log(data);
      setError(false);
      axios
        .post(`${API_URL}/ContactUs/newSubmition`, {
          ...data,
        })
        .then((res) => {
          setSaved(true);
          setError(false);
          console.log("true");
          setData({
            name: "",
            phone: "",
            email: "",
            message: "",
            respond: false,
          });
        })
        .catch((err) => {
          setSaved(false);
          setError(true);
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="small"
              sx={{ width: "90px", marginTop: "20px" }}>
              Submit
            </Button>
          </div>
          <div className={styles.links}>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              General Inquery
            </Typography>
            <Typography
              className={styles.linkForPc}
              variant="body2"
              sx={{ color: "#01a22e" }}>
              <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=info@healer.pk">
                info@healer.pk
              </a>
            </Typography>
            <Typography
              className={styles.linkForPhone}
              variant="body2"
              sx={{ color: "#01a22e" }}>
              <a href="mailto:info@healer.pk">info@healer.pk</a>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "10px" }}>
              Unani Medicine
            </Typography>
            <Typography
              className={styles.linkForPc}
              variant="body2"
              sx={{ color: "#01a22e" }}>
              <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=dawakhana@healer.pk">
                dawakhana@healer.pk
              </a>
            </Typography>
            <Typography
              className={styles.linkForPhone}
              variant="body2"
              sx={{ color: "#01a22e" }}>
              <a href="mailto:dawakhana@healer.pk">dawakhana@healer.pk</a>
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
