import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export default class Model {
  #collection = null;
  #converter = null;
  #ref = null;
  #isNew = true;
  #id = null;
  #db = null;

  constructor() {
    this.#db = getFirestore();
  }

  get id() {
    return this.#id;
  }

  set converter(converterFunc) {
    this.#converter = converterFunc;
  }

  get converter() {
    if (this.#converter) return this.#converter;
    else {
      return {
        toFirestore: (attributes) => {
          return attributes;
        },
        fromFirestore: (snapshot, options) => {
          return this.constructor.factory(snapshot.data(options));
        },
      };
    }
  }

  set collection(coll) {
    this.#collection = coll;
  }

  get collection() {
    return this.#collection;
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

  save(id = null) {
    this.#id = id;
    this.#ref = this.#isNew ? Model.create(this) : Model.update(this);
    this.#isNew = false;
    return this.#ref.id;
  }

  generateDocRef() {
    return this.id == null
      ? doc(collection(getFirestore(), this.collection))
      : doc(getFirestore(), this.collection, this.id);
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

  static get(id) {}

  static getAll() {}
}
