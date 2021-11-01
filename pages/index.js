import { useToggle } from "../helpers/reactHooks";
import Head from "next/head";
import Layout from "../components/layout";
import StoryCard from "../components/storyCard";
import Modal from "../components/modal";
import Story from "../db/models/story";

export default function Home({ stories }) {
  let [isCreateClicked, setIsCreateClicked] = useToggle();

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
                onClick={setIsCreateClicked}
              >
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span>New Story</span>
              </button>
            </div>
          </div>
          <div className="columns is-centered">
            {stories &&
              stories.map((story) => (
                <div className="column" key={story.id}>
                  <StoryCard story={Story.factory(story, false)} />
                </div>
              ))}
          </div>
        </div>
      </section>
      {isCreateClicked && <Modal closeHandler={setIsCreateClicked} />}
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  return { props: { stories: await Story.getAll() } };
}
