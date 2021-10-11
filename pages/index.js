import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Card from "../components/card";
import Modal from "../components/modal";

export default function Home() {
  let [modal, setModal] = useState(false);

  return (
    <>
      <section className="section">
        <Head>
          <title>Main</title>
        </Head>
        <div className="container">
          <div className="colums">
            <div className="column is-2">
              <button
                className="button is-primary"
                onClick={() => setModal(!modal)}
              >
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span>New Story</span>
              </button>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column">
              <Card />
            </div>
            <div className="column">
              <Card />
            </div>
            <div className="column">
              <Card />
            </div>
          </div>
        </div>
      </section>
      {modal && <Modal closeHandler={setModal} />}
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
