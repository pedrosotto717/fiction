import storage from './storage.js';

const request = async (url, keyStorage = '') => {
  try {
    let data = null
    if (keyStorage !== '') {
      data = storage.get(keyStorage) || false
      if (data !== false)
        return data
    }
    const response = await fetch(url)

    if (response.status !== 200)
      return 'The Api is Inaccessible'

    data = await response.json()
    if (keyStorage !== '')
      storage.set(keyStorage, data)
    return data
  } catch (err) {
    console.error(err)
    return 'An Error has Happened'
  }
}

export default request