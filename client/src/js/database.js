import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    // Open the database connection
    const jateDb = await openDB('jate', 1);
    // Start a new transaction with read/write permissions
    const tx = jateDb.transaction('jate', 'readwrite');
    // Get a reference to the 'jate' object store
    const store = tx.objectStore('jate');
    // Use the .put() method to store the content
    const request = store.put({ id: 1, value: content });
    // Get confirmation of the successful request
    const result = await request;
    console.log('🚀 - data saved!', result);
  } catch (error) {
    console.error('putDB not implemented');
  }
};

export const getDb = async () => {
  try {
    // Open the database connection
    const jateDb = await openDB('jate', 1);
    // Start a new transaction with readonly permissions
    const tx = jateDb.transaction('jate', 'readonly');
    // Get a reference to the 'jate' object store
    const store = tx.objectStore('jate');
    // Use the .get() method to retrieve the data by its id
    const request = store.get(1);
    // Get confirmation of the successful request
    const result = await request;
    // If a result is found, return it. If no result, return null
    return result ? result.value : null;
  } catch (error) {
    console.error('getDb not implemented');
  }  
};

initdb();
