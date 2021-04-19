import storage from './storage.js';

const request = async (url, keyStorage = '') => {
  try {
    let data = storage.get(keyStorage)
    if (data !== false)
      return data

    const response = await fetch(url)

    if (response.status !== 200)
      return {}

    data = await response.json()
    storage.set(keyStorage, data)
    return data
  } catch (err) {
    return console.error(err)
  }
}

export default request