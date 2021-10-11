import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import Modal from "../../components/modal";

export default class Model {
  static collectionName;
  static converter;
  static attributes = [];

  #ref = null;
  #isNew = true;
  #id = null;

  constructor() {
    this.#db = getFirestore();
  }

  get id() {
    return this.#id;
  }

  get attributes() {
    let obj = {};
    this.constructor.attributes.forEach((attr) => {
      if (this[attr] != null || this[attr] != undefined) obj[attr] = this[attr];
    });

    return obj;
  }

  save(id) {
    if (this.#isNew)
      this.#ref = this.constructor.create(
        id,
        this.constructor.collectionName,
        this.constructor.converter,
        this.attributes
      );
    else
      this.#ref = this.constructor.update(
        id,
        this.constructor.collectionName,
        this.constructor.converter,
        this.attributes
      );

    this.#id = this.#ref.id;
    this.#isNew = false;
    return this.#ref.id;
  }

  static generateDocRef(id, collectionName) {
    return id == undefined || id == null
      ? doc(collection(getFirestore(), collectionName))
      : doc(getFirestore(), collectionName, id);
  }

  static async create(id, collectionName, converter, data) {
    const docRef = converter
      ? this.generateDocRef(id, collectionName, converter).withConverter(
          converter
        )
      : this.generateDocRef(id, collectionName, converter);

    return await setDoc(docRef, this);
  }

  static async update(id, collectionName, converter, data) {
    return await updateDoc(
      Model.generateDocRef(id, collectionName, converter),
      this
    );
  }

  static get(id) {}

  static getAll() {}
}
