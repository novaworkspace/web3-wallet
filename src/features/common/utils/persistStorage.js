export class PersistStorage {
  constructor(storage) {
    this.storage = storage;
  }

  save(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
    return true;
  }

  load(key) {
    return JSON.parse(this.storage.getItem(key));
  }
}
