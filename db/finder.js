import { getDoc, getDocs, where, limit, orderBy } from "firebase/firestore";
import Ref from "./ref";

const ORDER_ASC = "asc";
const ORDER_DESC = "desc";

export default class Finder {
  #query = {
    where: null,
    order: null,
    limit: null,
  };

  #converter = null;
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

  get converter() {
    return this.#converter;
  }

  get ORDER_ASC() {
    return ORDER_ASC;
  }

  get Order_DESC() {
    return ORDER_DESC;
  }

  get query() {}

  static withCollection(coll) {
    return new Finder(coll);
  }

  withConverter(converter) {
    this.#converter = converter;
  }

  where(attr, op, value) {
    this.#query.where = where(attr, op, value);
    return this;
  }

  order(attr, ord = ORDER_ASC) {
    this.#query.order = orderBy(attr, ord);
    return this;
  }

  limit(num) {
    this.#query.limit = limit(num);
    return this;
  }

  startAt() {}
  endAt() {}
  startAfter() {}
  get() {}

  getById(id) {
    return await getDoc(Ref.generateDocRefWithId(id));
  }

  getAll() {
    return await getDocs(Ref.generateDocRefWithoutId());
  }
}
