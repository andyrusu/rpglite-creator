import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { initializeApp } from "firebase/app";
// import { connectAuthEmulator, getAuth } from "firebase/auth";
// import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { ProvideAuth } from "../components/provideAuth";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const app = initializeApp(firebaseConfig);
// console.log(app);
// const db = getFirestore();
// connectFirestoreEmulator(db, "localhost", 9100);
// connectAuthEmulator(getAuth(), "http://localhost:9099");

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default App;
