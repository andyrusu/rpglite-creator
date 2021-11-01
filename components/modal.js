import { useState, useRef } from "react";
import Story from "../db/models/story";
import { useOnClickOutside } from "../helpers/reactHooks";

export default function Modal({ closeHandler }) {
  const ref = useRef();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  useOnClickOutside(ref, closeHandler);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card" ref={ref}>
        <header className="modal-card-head">
          <p className="modal-card-title">New Story</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeHandler}
          ></button>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="A tale of two souls..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="A short description..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="file">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Cover image</span>
                </span>
              </label>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={() => {
              const story = new Story(name, desc, "");
              story.save();
              closeHandler();
            }}
          >
            Save
          </button>
          <button className="button" onClick={closeHandler}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
