export default function StoryCard(props) {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{props.model.name}</p>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src="{props.model.coverImage}" alt="{props.model.name}" />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
          <a href="#">@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a>
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
