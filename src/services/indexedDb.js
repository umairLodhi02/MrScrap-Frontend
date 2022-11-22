class DatabaseProvider {
  constructor() {
    this.db = {};
    this.dbName = "SessionDetails";
    this.dbVersion = 1;
    this.stores = { SESSIONSTORE: "SessionDetails" };
    this.request = null;
  }

  init = () => {
    return new Promise((resolve) => {
      this.request = window.indexedDB.open(this.dbName, this.dbVersion);

      if (this.request) {
        this.request.onupgradeneeded = () => {
          this.db = this.request.result;
          this.createTodosStore();
        };
      } else {
        this.createTodosStore();
      }

      this.request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      this.request.onerror = (error) => console.error("error", { error });
    });
  };

  createTodosStore = () => {
    const storeConfig = { keyPath: "randomId" };
    const objectStore = this.db.createObjectStore(
      [this.stores.SESSIONSTORE],
      storeConfig
    );
    // objectStore.createIndex("name", "name");
    // objectStore.createIndex("completed", "completed");
  };

  // createTodosStore = () => {
  //   const storeConfig = { keyPath: "SessionData" };
  //   const objectStore = this.db.createObjectStore(this.stores.SESSIONSTORE, storeConfig);
  //   // objectStore.createIndex("name", "name");
  //   // objectStore.createIndex("completed", "completed");
  // }

  getTodosObjectStore = () => {
    const transaction = this.db.transaction(
      this.stores.SESSIONSTORE,
      "readwrite"
    );
    transaction.onerror = (error) =>
      console.error("There was a transaction error", { error });
    return transaction.objectStore([this.stores.SESSIONSTORE]);
  };

  add = (data) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getTodosObjectStore();
      const addRequest = objectStore.put(data);
      addRequest.onsuccess = async () => {
        const allTodos = await this.getAll();
        resolve(allTodos);
      };
      addRequest.onerror = (error) => reject(error);
    });
  };

  updateById = (id, newValue) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getTodosObjectStore();
      const keyRange = IDBKeyRange.only(id);
      const cursor = objectStore.openCursor(keyRange);

      cursor.onsuccess = () => {
        const cursorWithValue = cursor.result;
        const { value } = cursorWithValue;

        const updateTo = { ...value, ...newValue };
        const update = cursorWithValue.update(updateTo);
        update.onsuccess = async () => {
          const allTodos = this.getAll();
          resolve(allTodos);
        };
        update.onerror = (error) => reject(error);
      };

      cursor.onerror = (error) => {};
    });
  };

  toggleCompleted = (id) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getTodosObjectStore();
      const keyRange = IDBKeyRange.only(id);
      const cursor = objectStore.openCursor(keyRange);

      cursor.onsuccess = () => {
        const cursorWithValue = cursor.result;
        const { value } = cursorWithValue;

        const updateTo = { ...value, completed: !value.completed };
        const update = cursorWithValue.update(updateTo);
        update.onsuccess = async () => {
          const allTodos = await this.getAll();
          resolve(allTodos);
        };
        update.onerror = (err) => reject(err);
      };

      cursor.onerror = (error) => {};
    });
  };

  deleteById = (id) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getTodosObjectStore();
      const deleting = objectStore.delete(id);

      deleting.onsuccess = async (response) => {
        const allTodos = await this.getAll();
        resolve(allTodos);
      };
      deleting.onerror = (error) => reject(error);
    });
  };

  getAll = () => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getTodosObjectStore();

      const openCursor = objectStore.openCursor();
      var items = {};

      openCursor.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          // items.push(cu;
          items = cursor.value;
        } else {
          resolve(items);
        }
      };

      openCursor.onerror = (error) => reject(error);
    });
  };

  getById = (id) => {
    return new Promise((resolve, reject) => {
      const objectStore = this.getTodosObjectStore();
      const request = objectStore.get(id);
      request.onsuccess = () =>
        request.result ? resolve(request.result) : reject("Not found");
      request.onerror = (error) => reject(error);
    });
  };
}

export const DatabaseService = new DatabaseProvider();
