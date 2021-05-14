import defineState from './defineState.js'

export default (() => {
  const contextsCollection = []

  function _Context(_config) {
    const contextValue = { ..._config.state }

    this.nameContext = _config.name
    defineState(this, contextValue, true)
    this.changeStateEvent = new CustomEvent(_config.name, { detail: { date: Date.now() } })

    addToContextCollection({ name: _config.name, _this: this })
  }

  _Context.prototype.provider = function () {
    return [this.state, this.setState.bind(this), this.nameContext]
  };

  _Context.prototype.setState = function (newState) {
    try {
      if (typeof newState === "object")
        this.state = newState

      if (this.ifSetState) {
        document.dispatchEvent(this.changeStateEvent)
        return true
      }
    } catch (error) {
      console.log("Error")
    }
    return false
  };

  function create(_config) {
    if (!('name' in _config) || !('state' in _config)) return false

    const context = verifyIfExistContext(_config.name)

    if (context)
      return context._this

    return new _Context(_config)
  }

  function verifyIfExistContext(namecontext) {
    return contextsCollection.find(contx => contx.name === namecontext) || false
  }

  function addToContextCollection(context) {
    if (context.name && context._this) {
      contextsCollection.push(context)
    }
  }

  return { create }
})()