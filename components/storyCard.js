import { Timestamp } from "@firebase/firestore";
import { format } from "date-fns";

export default function StoryCard(props) {
  const timestamp = new Timestamp(
    props.model.createdAt.seconds,
    props.model.createdAt.nanoseconds
  );
  const dateFormatLong = format(timestamp.toDate(), "KK:mm a - d MMM yyyy");
  const dateFormatShort = format(timestamp.toDate(), "yyyy-M-d");

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{props.model.name}</p>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={props.model.coverImage} alt={props.model.name} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {props.model.description}
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
        <a href="#" className="card-footer-item">
          Delete
        </a>
      </footer>
    </div>
  );
}
