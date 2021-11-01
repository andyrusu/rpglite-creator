import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default class Finder {
  query = {
    where: null,
    order: null,
    limit: null,
  };

  where() {}
  order() {}
  limit() {}
  startAt() {}
  endAt() {}
  startAfter() {}
  get() {}
}
