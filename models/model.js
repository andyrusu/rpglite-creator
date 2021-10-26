import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default class Model {
  #ref = null;
  isNew = true;
  id = null;

  get converter() {
    return {
      toFirestore: (attributes) => {
        return attributes;
      },
      fromFirestore: (snapshot, options) => {
        return this.constructor.factory(snapshot.data(options));
      },
    };
  }

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

  generateDocRef() {
    return this.id == null
      ? doc(collection(getFirestore(), this.collection))
      : doc(getFirestore(), this.collection, this.id);
  }

  save(id = null) {
    this.id = id;
    this.#ref = this.isNew ? Model.create(this) : Model.update(this);
    this.isNew = false;
    this.id = this.id ? this.id : this.#ref.id;
    return this.#ref;
  }

  update() {
    return Model.update(this);
  }

  delete() {
    Model.delete(this);
  }

  static getDb() {
    return getFirestore();
  }

  static async create(model) {
    const docRef = model.converter
      ? model
          .generateDocRef(model.id, model.collection, model.converter)
          .withConverter(model.converter)
      : model.generateDocRef(model.id, model.collection, model.converter);

    return await setDoc(docRef, model.attributes);
  }

  static async update(model) {
    return await updateDoc(
      Model.generateDocRef(model.id, model.collection, model.converter),
      model
    );
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

  static async delete(model) {
    console.log("Delete: ", model, this.collection(), model.id);
    await deleteDoc(doc(getFirestore(), model.collection, model.id));
  }
}
