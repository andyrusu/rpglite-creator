import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { initializeApp } from "firebase/app";
import { ProvideAuth } from "../components/provideAuth";

const firebaseConfig = {
  apiKey: "AIzaSyAD7Eq6hUEVGuKMRTUWH5CYyisyqP-aQ64",
  authDomain: "rpglite-3fc46.firebaseapp.com",
  projectId: "rpglite-3fc46",
  databaseURL:
    "https://rpglite-3fc46-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "rpglite-3fc46.appspot.com",
  messagingSenderId: "767985415267",
  appId: "1:767985415267:web:7f599cee190f8e8e953456",
  measurementId: "G-EJ8B18N0P1",
};

const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
