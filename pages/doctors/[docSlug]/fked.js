import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { API_URL } from "@/config/config";
import { useRouter } from "next/router";


export default function FkedUP() {
  const router = useRouter();
  const {docSlug} = router.query;

  console.log(docSlug);
  
  const [doc, setDoc] = useState(null);

  const getDoc = async () => {
    // console.log(docSlug);
    await axios.post(`${API_URL}/doctor/getDocDataBySlug`, {
      "docSlug": docSlug,
    }).then((res) => {
      console.log(res.data)
      setDoc(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    if(docSlug) {
      getDoc();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docSlug])



  return (
    <div>fkedUP</div>
  )
}
