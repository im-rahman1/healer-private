import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDunpGuxdx7VJ7RB2lt8iAASkuTbZYCqIY",
  authDomain: "healercare-b6b7f.firebaseapp.com",
  projectId: "healercare-b6b7f",
  storageBucket: "healercare-b6b7f.appspot.com",
  messagingSenderId: "884106203484",
  appId: "1:884106203484:web:913eeb14b73b8ee81a3199",
  measurementId: "G-YVZX05BRZR",
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = firebase.auth(app);
=======
//   apiKey: "AIzaSyDunpGuxdx7VJ7RB2lt8iAASkuTbZYCqIY",
//   authDomain: "healercare-b6b7f.firebaseapp.com",
//   projectId: "healercare-b6b7f",
//   storageBucket: "healercare-b6b7f.appspot.com",
//   messagingSenderId: "884106203484",
//   appId: "1:884106203484:web:64a069266b6607871a3199",
//   measurementId: "G-6XHGRH9T28"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
>>>>>>> f18901074d8e7dc3be87f557c996fb9df07d9d68
