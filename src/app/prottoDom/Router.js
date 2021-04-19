export default (() => {
  let routes = null,
    currentRoute = {},
    subscriber = (obj) => obj,
    routeChangeEvent = new CustomEvent('routeChange')

  const load = (_routes) => routes = _routes

  const init = (executeHandler = false) => {
    const routing = () => {
      const path = cleanUrl(location.hash.substring(1))
      resolve(path)

      if (executeHandler === true) currentRoute.handler(currentRoute.urlParams)
    }

    window.addEventListener('hashchange', routing);
    window.addEventListener('DOMContentLoaded', routing);
  }

  const cleanUrl = (url) => {
    if (url === '/' || url === '') return '/'

    const splitUrl = url.split('/')

    if (splitUrl[splitUrl.length - 1] === "")
      splitUrl.pop()

    return splitUrl.join('/')
  }

  const resolve = (path) => {
    currentRoute = matchPath(path)

    if (currentRoute === null) { // return
      console.warn('404 NotFound')
      return false
    }

    document.dispatchEvent(routeChangeEvent)
    return subscriber(currentRoute) || null
  }

  const matchPath = (path) => {
    const urlParametersObj = {}

    const mathRoute = routes.find((route) => {
      if (route.path === path) return true
      if (!route.path.includes(":")) return false

      const exp = RegExp(route.path.replace(/(:[^\/]+)/ig, "([A-Za-z0-9]+)").replace(/\//ig, "\\/") + "$")

      if (!exp.test(path)) return false

      const pathSplit = route.path.split('/'),
        pathParamsList = pathSplit.filter(el => el.includes(':')),
        urlSplit = path.split('/')

      const urlParameters = urlSplit.filter((el, index) => pathSplit[index].includes(':') && el !== pathSplit[index])
      pathParamsList.forEach((el, index) => {
        urlParametersObj[el.substring(1)] = urlParameters[index]
      })

      return true
    }) || null

    return mathRoute && { ...mathRoute, args: urlParametersObj }
  }

  const dispatch = () => currentRoute

  const subscribe = (_subscriber) => {
    subscriber = _subscriber
  }
  return {
    load,
    init,
    subscribe,
    dispatch
  }
})();
