
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDunpGuxdx7VJ7RB2lt8iAASkuTbZYCqIY",
  authDomain: "healercare-b6b7f.firebaseapp.com",
  projectId: "healercare-b6b7f",
  storageBucket: "healercare-b6b7f.appspot.com",
  messagingSenderId: "884106203484",
  appId: "1:884106203484:web:64a069266b6607871a3199",
  measurementId: "G-6XHGRH9T28"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();