import { useState } from "react";
import { useAuth } from "../../auth/provideAuth";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
  let auth = useAuth();
  let router = useRouter();
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");

  return (
    <section className="hero is-primary is-fullheight">
      <Head>
        <title>Login</title>
      </Head>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box">
                <div className="field">
                  <label htmlFor="" className="label">
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      className="input"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      required
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button
                    className="button is-success"
                    onClick={(e) => {
                      e.preventDefault();
                      auth.signin(email, pass);
                      router.push("/");
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
