import { Timestamp, serverTimestamp } from "firebase/firestore";
import { toTimestamp } from "../../helpers/date";
import Model from "./model";

export default class Story extends Model {
  constructor(
    name,
    description,
    coverImage,
    isPublished,
    createdAt = null,
    updatedAt = null,
    isNew = true
  ) {
    super();
    this.attributes = {
      name: name,
      description: description,
      coverImage:
        coverImage === undefined || coverImage === null
          ? "https://bulma.io/images/placeholders/1280x960.png"
          : coverImage,
      isPublished: !(isPublished === undefined || isPublished === null),
      createdAt:
        createdAt === undefined || createdAt === null
          ? serverTimestamp()
          : createdAt,
      updatedAt:
        updatedAt === undefined || updatedAt === null
          ? serverTimestamp()
          : updatedAt,
    };
    this.isNew = isNew;
  }

  get attributeNames() {
    return [
      "name",
      "description",
      "coverImage",
      "isPublished",
      "createdAt",
      "updatedAt",
    ];
  }

  static get collection() {
    return "stories";
  }

  static factory(data, isNew = true) {
    const story = new Story(
      data.name,
      data.description,
      data.coverImage,
      data.isPublished,
      toTimestamp(data.createdAt),
      toTimestamp(data.updatedAt),
      isNew
    );

    if (data.id) story.id = data.id;

    return story;
  }

  static jsonFactory(data, id = null) {
    const updatedAt = toTimestamp(data.updatedAt);
    console.log(data);
    return {
      id: id,
      name: data.name,
      description: data.description,
      coverImage: data.coverImage,
      isPublished: data.isPublished,
      createdAt: toTimestamp(data.createdAt).toJSON(),
      updatedAt: updatedAt instanceof Timestamp ? updatedAt.toJSON() : null,
    };
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
