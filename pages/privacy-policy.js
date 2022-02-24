import { Typography, Box } from "@mui/material";
import Layout from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      <Box sx={{ margin: "30px 20px" }}>
        <Typography variant="h5" sx={{ margin: "30px 0 5px 0" }}>
          Privacy Policy
        </Typography>
      </Box>
    </Layout>
  );
}
