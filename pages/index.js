import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Card from "../components/storyCard";
import Modal from "../components/modal";
import Story from "../models/story";

export default function Home(props) {
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
            {props.stories &&
              props.stories.map((story) => (
                <div className="column">
                  <StoryCard model={story} />
                </div>
              ))}
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

export async function getServerSideProps() {
  const stories = await Story.getAll();
  // let stories = null;
  // storiesPromise.then((data) => {
  //   stories = data;
  // });

  return { props: { stories } };
}
