import { useRouter } from "next/router";

import Layout from "../../../components/Layout";

export default function VerifyDoctor() {
  const router = useRouter();
  const doctorId = router.query.doctorId;

  return <Layout title="Verify">{doctorId}</Layout>;
}
