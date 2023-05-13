import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAMxedZNDcj0Nj6AbhZ1HR_IsPOfhRN0Gk",
  authDomain: "kjoreskole-525f2.firebaseapp.com",
  projectId: "kjoreskole-525f2",
  storageBucket: "kjoreskole-525f2.appspot.com",
  messagingSenderId: "148579261458",
  appId: "1:148579261458:web:7f55b3638afb97764c8ccb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {
  firebaseConfig,
  db,
  auth
}