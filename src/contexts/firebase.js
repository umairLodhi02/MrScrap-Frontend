import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT08bxuBUN4_1BFaAm9SD96b6ZdkFimUg",
  authDomain: "mr-scrap.firebaseapp.com",
  projectId: "mr-scrap",
  storageBucket: "mr-scrap.appspot.com",
  messagingSenderId: "733900060527",
  appId: "1:733900060527:web:8ecaf239889b29a2349a9a",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;
