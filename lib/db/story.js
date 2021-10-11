import Model from "./model";

export const storyConverter = {
  toFirestore: (story) => {
    const attributes = story.attributes;
    return {
      name: attributes.name,
      description: attributes.desc,
      file: attributes.file,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Story(data.name, data.description, data.file);
  },
};

export default class Story extends Model {
  static collectionName = "stories";
  static converter = storyConverter;
  static attributes = ["name", "desc", "file"];

  constructor(name, desc, file) {
    super();
    this.name = name;
    this.desc = desc;
    this.file = file;
  }
}
