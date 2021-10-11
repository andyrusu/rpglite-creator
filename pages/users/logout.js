import { useAuth } from "../../lib/provideAuth.js";
import { withRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

function Logout({ router }) {
  console.log(router);
  let auth = useAuth();
  auth.signout();

  useEffect(() => router.push("/users/login"));

  return (
    <div>
      <Head>
        <title>Logout</title>
      </Head>
      <h1>Logging out...</h1>
    </div>
  );
}

export default withRouter(Logout);
