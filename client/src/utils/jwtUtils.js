const STORE_NAME = 'jwt_token';

export const getToken = () => {debugger

  let dataStorage = getStorage();

  if (dataStorage && dataStorage) {
    return dataStorage;
  }
  return;
}

export const getStorage = () => {

  let dataStorage = localStorage.getItem(STORE_NAME);

  if (dataStorage){
    return JSON.parse(dataStorage);
  }
  return;
}

export const setStorage = (data) => {debugger

  if (data) {
    try {
      localStorage.setItem(STORE_NAME, JSON.stringify(data));
      return true;
    } catch(e){
      return false;
    }
  } else {
    try {
      localStorage.removeItem(STORE_NAME);
      return true;
    } catch(e){
      return false;
    }
  }
}


export default {
  getToken,
  getStorage,
  setStorage
}