import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { API_URL } from "@/config/config";
import axios from 'axios';
import localforage from 'localforage'; 

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [uName, setUName] = useState("");
  const [uPhone, setUPhone] = useState("");
  const [patientId, setPatientId] = useState('');

  async function logOut() {
    return signOut(auth).then(res => {
      // console.log('loggedOut');
      setUser(null);
      localStorage.removeItem("proactiveRefresh_n");
      localStorage.removeItem("errorBackoff_P");
      localStorage.removeItem("proactiveRefresh_p");
      location.reload();
    }).catch(err => {
      // console.log('error in loggedOut')
    });
  }

  const getCreds = () => {
    const uN = localStorage.getItem("proactiveRefresh_n");
    const uP = localStorage.getItem("proactiveRefresh_p");

    setUName(uN.split("").reverse().join(""));
    setUPhone(uP.split("").reverse().join(""));
    // console.log('getCreds()')
  }

  const setUpRecaptcha = (number) => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        getCreds()
        signIn(number);
        console.log("Recaptcha varified");
      },
    }, auth);
  };

  const signIn = async(number) => {
    setUpRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    await signInWithPhoneNumber(auth, number, appVerifier).then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log('OTP has been sent');
      return confirmationResult; 
    }).catch(err => {
      console.log(err);
      return err;
    })
  }

  const sendUser = async() => {
    // console.log('sendUser()')
    await axios.post(`${API_URL}/patient/addPatient`, {
      fullName: uName,
      phone: uPhone,
      appToken: "ok",
      callToken: "",
      gender: "",
      age: "",
      email: "",
      address: "",
      city: ""
    }).then(res => {
      // console.log(res.data);
      // setPatientId(res.data);
      const rPatientId = res.data.split("").reverse().join("")
      localStorage.setItem("errorBackoff_P", rPatientId);
      location.reload();
    }).catch(err => {
      console.log(err)});
  }

  const verifyOtp = async(otp) => {
    console.log('verifying Otp');
    if(!otp) return;
    window.confirmationResult.confirm(otp).then((result) => {
      // console.log(result.user);
      sendUser();
      setUser(result.user);
      return result.user;
    }).catch((err) => {
      console.log(err);
      return err;
    })
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log(currentuser);
      if(currentuser) {
        setUser(currentuser);
      }
    });
    
    return () => {
      unsubscribe();
    };
    
  }, []);

  // console.log(uName)
  // console.log(uPhone)

  return (
    <userAuthContext.Provider
      value={{
        user,
        signIn,
        logOut,
        verifyOtp,
        setUpRecaptcha,
        sendUser,
        getCreds
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}