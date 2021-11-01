import { getFirestore, collection, doc } from "firebase/firestore";

export default class Ref {
  static generateDocRef(coll, id = null) {
    return id == null
      ? this.generateDocRefWithoutId(coll)
      : this.generateDocRefWithId(coll, id);
  }

  static generateDocRefWithId(coll, id) {
    return doc(getFirestore(), coll, id);
  }

  static generateDocRefWithoutId(coll) {
    return doc(collection(getFirestore(), coll));
  }
}
