import { setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Ref from "./ref";

export default class Writer {
  #collection = "";

  constructor(collection) {
    this.collection = collection;
  }

  set collection(coll) {
    this.#collection = coll;
  }

  get collection() {
    return this.#collection;
  }

  static withCollection(coll) {
    return new Writer(coll);
  }

  async create(data, id = null, converter = null) {
    const docRef = Ref.generateDocRef(this.collection, id);
    if (converter) docRef.withConverter(converter);
    return await setDoc(docRef, data);
  }

  async update(data, id) {
    return await updateDoc(Ref.generateDocRefWithId(this.collection, id), data);
  }

  async delete(id) {
    await deleteDoc(Ref.generateDocRefWithId(this.collection, id));
  }
}
