import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBYmdbSDSTRpsd0p3RJKQj5GLGSeEgwFik",
  authDomain: "finance-app-a41cb.firebaseapp.com",
  databaseURL: "https://finance-app-a41cb-default-rtdb.firebaseio.com/",
  projectId: "finance-app-a41cb",
  storageBucket: "finance-app-a41cb.appspot.com",
  messagingSenderId: "650886535186",
  appId: "1:650886535186:web:94d00b443effc2b74c60cb",
};

// init firebase
initializeApp(firebaseConfig);
const db = getDatabase();
// init firebase auth
const auth = getAuth();

export { auth, db };
