// Sets an item with a Key to local storage
const saveStorage = function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  // Looks for a local storage item and returns if present
  const getStorage = function (key, item) {
    if (localStorage.getItem(key)) {
      const data = JSON.parse(localStorage.getItem(key));
      return item ? data[item] : data;
    } else {
      return null;
    }
  };
  
  // Clear a single item from local storage
  const clearStorage = function (key) {
    localStorage.removeItem(key);
  };
  
  // Clear the whole local storage
  const clearAllStorage = function () {
    localStorage.clear();
  };
  
  // Export the functions
  export { getStorage, saveStorage, clearStorage, clearAllStorage };
  