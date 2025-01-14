// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , setPersistence ,browserLocalPersistence} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFy-LTFbQMeJzvYSz5RK87jnfzd-a30d8",
  authDomain: "altar-d8ead.firebaseapp.com",
  projectId: "altar-d8ead",
  storageBucket: "altar-d8ead.firebasestorage.app",
  messagingSenderId: "156127593045",
  appId: "1:156127593045:web:a8a2822f02a546944f0adc",
  measurementId: "G-PXF8KFQT18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("Error setting persistence:", error)
);
export { auth, provider };
