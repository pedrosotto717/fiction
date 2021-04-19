function set(key, data) {
  try {
    const parsedData = JSON.stringify(data) || null
    sessionStorage.setItem(key, parsedData)
  } catch (error) {
    return null
  }
}

function get(key) {
  try {
    const data = sessionStorage.getItem(key)
    if (data === null)
      return false

    return JSON.parse(data)
  } catch (error) {
    return false
  }
}

export default { get, set }