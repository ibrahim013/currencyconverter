let db;
window.onload = () => {
    let request = window.indexedDB.open('currency-db', 1);
    request.onerror = () => {
        console.log('Database failed to open');
      };
      request.onsuccess = () => {
        console.log('Database opened successfully');
      }
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        let objectStore = db.createObjectStore('currency', { keyPath: 'id' });
        // Define what data items the objectStore will contain
        console.log('Database setup complete');
      };  
}
const addCurrency = (data) => {
  // open a read/write db transaction, ready for adding the data
  let transaction = db.transaction(['currency'], 'readwrite');
  // call an object store that's already been added to the database
  let objectStore = transaction.objectStore('currency');
  let request = objectStore.add(data);
  transaction.oncomplete = () => {
    return;
  };
  transaction.onerror = () => {
    return;
  }; 
}

