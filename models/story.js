import { serverTimestamp } from "firebase/firestore";
import Model from "./model";

export default class Story extends Model {
  static factory(data) {
    return new Story(
      data.name,
      data.description,
      data.coverImage,
      data.createdAt ? data.createdAt : undefined,
      data.updatedAt ? data.updatedAt : undefined
    );
  }

  static jsonFactory(data) {
    return {
      name: data.name,
      description: data.description,
      coverImage: data.coverImage,
      createdAt: data.createdAt ? data.createdAt.toString() : undefined,
      updatedAt: data.updatedAt ? data.updatedAt.toString() : undefined,
    };
  }

  constructor(
    name,
    description,
    coverImage,
    createdAt = null,
    updatedAt = null
  ) {
    super();
    this.attributes = { name, description, coverImage, createdAt, updatedAt };
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
        return Story.factory(snapshot.data(options));
      },
    };
  }
}
