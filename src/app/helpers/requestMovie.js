import storage from './storage.js';
import provider from "../services/moviesProvider.js";

const request = async (url, keyStorage = '') => {
  const options = {
        headers: new Headers({
            'Authorization': `Bearer ${provider.API_KEY}`,
            'Content-Type': 'application/json;charset=utf-8',
        }),
        method: 'GET',
    }


  try {
    let data = null
    if (keyStorage !== '') {
      data = storage.get(keyStorage) || false
      if (data !== false)
        return data
    }
    const response = await fetch(url, options)

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