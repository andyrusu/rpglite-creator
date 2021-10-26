import { format } from "date-fns";
import Story from "../models/story";

export default function StoryCard(props) {
  const story = Story.factory(props.model);
  const dateFormatLong = format(
    story.createdAt.toDate(),
    "KK:mm a - d MMM yyyy"
  );
  const dateFormatShort = format(story.createdAt.toDate(), "yyyy-M-d");

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{story.name}</p>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={story.coverImage} alt={story.name} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {story.description}
          <br />
          <time dateTime={dateFormatShort}>{dateFormatLong}</time>
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Edit
        </a>
        <a href="#" className="card-footer-item">
          Publish
        </a>
        <a href="#" className="card-footer-item" onClick={() => story.delete()}>
          Delete
        </a>
      </footer>
    </div>
  );
}
