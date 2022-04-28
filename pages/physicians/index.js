import React from "react";
import styles from "@/styles/physicians.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";

// mui
import { Avatar, Breadcrumbs, Typography, Rating } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CircleIcon from "@mui/icons-material/Circle";

import DocCard from "@/components/common/docCard";

const muiStyles = {
  link: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  avatar: {
    width: "3.5rem",
    height: "3.5rem",
  },
};

const arr = [1, 2, 3, 4, 5];

export default function Physicians() {
  const breadcrumbs = [
    <Link href="/" key="1" color="inherit" passHref>
      <Typography sx={muiStyles.link}>Home</Typography>
    </Link>,
    <Typography href="/" key="3" color="text.primary">
      Physicians
    </Typography>,
  ];

  return (
    <Layout title="Physicians">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <div className={styles.DocCardContainer}>
        <DocCard />
        <DocCard />
        <DocCard />
      </div>
    </Layout>
  );
}
