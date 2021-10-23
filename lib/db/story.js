import Model from "./model";

export default class Story extends Model {
  constructor(name, description, coverImage) {
    super();
    this.attributes = { name, description, coverImage };
    this.collection = "stories";
  }

  get attributeNames() {
    return ["name", "description", "coverImage"];
  }

  static factory(data) {
    return new Story(data.name, data.description, data.coverImage);
  }
}
