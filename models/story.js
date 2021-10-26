import { Timestamp, serverTimestamp } from "firebase/firestore";
import { toTimestamp } from "../helpers/date";
import Model from "./model";

export default class Story extends Model {
  static factory(data, isNew = true) {
    return new Story(
      data.name,
      data.description,
      data.coverImage,
      toTimestamp(data.createdAt),
      toTimestamp(data.updatedAt),
      isNew
    );
  }

  static jsonFactory(data) {
    const updatedAt = toTimestamp(data.updatedAt);
    return {
      name: data.name,
      description: data.description,
      coverImage: data.coverImage,
      createdAt: toTimestamp(data.createdAt).toJSON(),
      updatedAt: updatedAt instanceof Timestamp ? updatedAt.toJSON() : null,
    };
  }

  constructor(
    name,
    description,
    coverImage,
    createdAt = null,
    updatedAt = null,
    isNew = true
  ) {
    super();
    this.attributes = { name, description, coverImage, createdAt, updatedAt };
    this.isNew = isNew;
  }

  get attributeNames() {
    return ["name", "description", "coverImage", "createdAt", "updatedAt"];
  }

  static get collection() {
    return "stories";
  }

  get converter() {
    return {
      toFirestore: (model) => {
        const timestamp = serverTimestamp();
        let attributes = model instanceof Story ? model.attributes : model;

        if (attributes.createdAt) attributes.updatedAt = timestamp;
        else attributes.createdAt = timestamp;

        return attributes;
      },
      fromFirestore: (snapshot, options) => {
        return Story.factory(snapshot.data(options), false);
      },
    };
  }
}
