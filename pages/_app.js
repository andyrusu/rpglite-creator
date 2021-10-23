import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { initializeApp } from "firebase/app";
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

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
