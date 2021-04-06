import DOM from "./DOM.js";
import strRand from "./random.js";
import defineState from './defineState.js'

export default (function() {

  function Component(_config) {
    var valueState = { ..._config.state };

    this.template = _config.template
    this.config = {}
    this.config.name = _config.name
    this.config.key = `${this.config.name}-${strRand()}`
    this.selector = `[key=${this.config.key}]`
    this.config.makeSelector = (id_target) => `${this.selector}[id-target=${id_target}]`;
    this.nodesCollection = new Map()

    if (valueState !== null && valueState !== undefined) {
      defineState(this, valueState)
    }

    if (Array.isArray(_config.useContext))
      makeContext.call(this, _config.useContext)

    if (typeof _config.componentDidMount === "function")
      this.config.componentDidMount = _config.componentDidMount

    if (typeof _config.componentWillUpdate === "function")
      this.config.componentWillUpdate = _config.componentWillUpdate

    if (typeof _config.events === "function")
      _config.events.call(this)
  }

  Component.prototype.template = null
  Component.prototype.keyGen = function(id) {
    return `${this.config.name}-${id}`
  }

  Component.prototype.setState = function(newState) {
    if (typeof newState === "object")
      this.state = newState

    if (this.ifSetState)
      this.renderForEachElement()
  };

  Component.prototype.renderForEachElement = function() {
    for (const [nodeKey, nodeValue] of this.nodesCollection.entries()) {
      this.reRender(nodeKey, nodeValue)
    }
  }

  Component.prototype.render = function(props, id_target = 'unique') {
    if (this.nodesCollection.size === 0) {
      if (typeof this.config.componentDidMount === "function")
        this.config.componentDidMount.call(this)
    }else{
      if (typeof this.config.componentWillUpdate === "function")
        this.config.componentWillUpdate.call(this)
    }

    this.nodesCollection.set(id_target, { props })

    const tplNode = DOM.htmlToNode(this.template(props), 2)

    if (typeof tplNode === "string") return tplNode

    tplNode.setAttribute("key", this.config.key)
    tplNode.setAttribute("id-target", id_target)
    return tplNode.outerHTML
  };

  Component.prototype.reRender = function(nodeKey, { props }) {
    const elem = document.querySelector(this.config.makeSelector(nodeKey)),
      virtual = DOM.htmlToNode(this.template(props), 2) || null

    if (elem === null || virtual === null) return false
    if (elem.isEqualNode(virtual)) return false

    let VirtualChildNodes = [...virtual.childNodes],
      DomChildNodes = [...elem.childNodes]

    if (DomChildNodes.length >= VirtualChildNodes.length) {

      DomChildNodes.forEach((node, index) => {
        if (node.isEqualNode(VirtualChildNodes[index])) return false

        VirtualChildNodes[index]
          ? node.replaceWith(VirtualChildNodes[index])
          : node.remove()
      });
    } else if (DomChildNodes.length < VirtualChildNodes.length) {

      VirtualChildNodes.forEach((node, index) => {
        if (DomChildNodes[index] !== undefined && DomChildNodes[index] !== null) {
          if (node.isEqualNode(DomChildNodes[index])) return false

          node
            ? DomChildNodes[index].replaceWith(node)
            : DomChildNodes[index].remove()
        } else
          elem.appendChild(node)
      });
    }
  }

  const makeContext = function(provider) {
    const [stateContex, setStateContext, nameContext] = provider

    this.context = stateContex

    this.pushContext = function(newValue) {
      setStateContext(newValue)
    }

    document.addEventListener(nameContext, (ev) => {
        this.renderForEachElement()
    });
  }

  Component.prototype.addEventListener = function(type, handler, selector = false) {
    DOM.addEventListener(type, handler, selector ? `${this.selector} ${selector}` : this.selector)
  };

  return Component
})();
