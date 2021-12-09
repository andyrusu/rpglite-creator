import { getFirestore, collection, getDocs } from "firebase/firestore";
import Writer from "../writer";

export default class Model {
  #ref = null;
  isNew = true;
  id = null;

  set attributes(attrs) {
    this.attributeNames.forEach((attr) => {
      if (attrs[attr] !== undefined) {
        this[attr] = attrs[attr];
      }
    });
  }

  get attributes() {
    let obj = {};
    this.attributeNames.forEach((attr) => {
      if (this[attr] != null || this[attr] != undefined) obj[attr] = this[attr];
    });

    return obj;
  }

  save(id = null) {
    this.#ref = this.isNew
      ? Writer.withCollection(this.constructor.collection).create(
          this.attributes,
          id,
          this.converter
        )
      : Writer.withCollection(this.constructor.collection).update(
          this.attributes,
          id
        );
    this.isNew = false;
    this.id = id ? id : this.#ref.id;
    return this.#ref;
  }

  update() {
    return Writer.withCollection(this.constructor.collection).update(
      this.attributes,
      this.id
    );
  }

  delete() {
    Writer.withCollection(this.constructor.collection).delete(this.id);
  }

  static async getAll() {
    const querySnapshot = await getDocs(
      collection(getFirestore(), this.collection)
    );
    let models = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const model = this.jsonFactory(data);
      model.id = doc.id;

      models.push(model);
    });

    return models;
  }

  static get(model, id) {}
}
