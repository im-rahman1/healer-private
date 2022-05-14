import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/bookAppointment.module.css";
import axios from "axios";
import { API_URL } from "@/config/config";

export default function BookAppointment() {
  return (
    <Layout title="Book Appointment">
      <div>bookAppointment</div>
    </Layout>
  )
}
