import { Typography, Box } from "@mui/material";
import Layout from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      <Box sx={{ margin: "30px 20px" }}>
        <Typography variant="h5" sx={{ margin: "30px 0 5px 0" }}>
          Delivery Policy
        </Typography>
        <Typography>
          Delivery is completed by Trax Logistics. Medicines will be dispatched
          in packages.
        </Typography>
        <Typography>
          The estimated delivery time will be 2 to 3 days and the tracking
          information supplied.
        </Typography>
        <Typography>
          If for any reason, there is a delay in delivery which is outside our
          control, we shall inform you of a revised estimated delivery date.
        </Typography>
        <Typography>
          Delivery will take place to the provided delivery address.
        </Typography>
        <Typography>
          Identity verification software will be used to verify your age and
          identity.
        </Typography>
        <Typography>
          Upon delivery you may be asked to present your ID to the delivery
          person.
        </Typography>
        <Typography>
          Once the package is dispatched, you are bound by our terms and
          conditions of use of our shipping couriers. 
        </Typography>
      </Box>
    </Layout>
  );
}
