const storage = {
  saveTodosToStorage: (item) => {
    localStorage.setItem('todos', JSON.stringify(item));
  },

  saveUsedIdsArrToStorage: (adsArr) => {
    localStorage.setItem('usedIdsArr', JSON.stringify(adsArr));
  },
};

export default storage;
