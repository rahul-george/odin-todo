class FileStorage {
  constructor(key) {
    this.key = key;
  }

  load() {
    if (localStorage.getItem(this.key) !== null) {
      return JSON.parse(localStorage.getItem(this.key));
    }
    return [];
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

export { FileStorage };
