import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAuadgXQhohZ85uaBcQ08r4V9Dlb4xspDo",
  authDomain: "history-game-82cf7.firebaseapp.com",
  databaseURL: "https://history-game-82cf7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "history-game-82cf7",
  storageBucket: "history-game-82cf7.appspot.com",
  messagingSenderId: "463397557543",
  appId: "1:463397557543:web:9700bf36db26290fea8502",
  measurementId: "G-NRLC4FM491"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default app;
export {db} ;