import React, { useState } from 'react'
import styles from '@/styles/myAppointments.module.css'
import Layout from '@/components/Layout'
import { Divider, Typography } from '@mui/material';

function MyAppointments() {
  const [toggle, setToggle] = useState(null)

  return (
    <Layout title="My Appointments">
      <div className={styles.myAppointmentsPage}>
        <Typography variant='h5'>
          My Appointments
        </Typography>
        <div className={styles.togglersContainer}>
          <div onClick={() => setToggle("current")} className={toggle == 'current' ? styles.toggler1Selected : styles.toggler1}>
            <Typography>
              Current
            </Typography>
          </div>
          <div onClick={() => setToggle("previous")} className={toggle == 'previous' ? styles.toggler2Selected : styles.toggler2}>
            <Typography>
              Previous
            </Typography>
          </div>
        </div>
        <div className={styles.appointmentsContainer}>
          <div className={styles.appointment}>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyAppointments;
