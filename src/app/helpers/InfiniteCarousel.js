import DOM from '../prottoDom/DOM.js'

class InfiniteCarousel {
  settings = null
  parentContainer = null
  itemsCarrousel = null
  isReady = null
  sizeOffset = null
  isOnPause = false
  /*
   * @param settings {container,classItems,prevSelector,nextSelector,timeInterval}
   */
  constructor(settings) {
    this.settings = settings
    this.timeInterval = settings.timeInterval || false
    DOM.addEventListener('click', () => this.goLeft(), settings.prevSelector)
    DOM.addEventListener('click', () => this.goRight(), settings.nextSelector)
    addEventListener('resize', () => {
      let newSize = calculateSizeItem(this.itemsCarrousel[0])
      this.sizeOffset = newSize < (this.sizeOffset * 1.25) ? newSize : this.sizeOffset
    })
    this.init(this.settings)
    this.run()
  }

  init({ container, classItems }) {
    try {
      this.parentContainer = typeof container === 'string' ? document.querySelector(container) || null : container
      if (!this.parentContainer)
        this.stop()

      this.itemsCarrousel = this.parentContainer.getElementsByClassName(classItems) || null

      if (this.parentContainer === null && this.itemsCarrousel === null)
        return this.stop()

      this.isReady = true
      this.isOnPause = false
      this.sizeOffset = calculateSizeItem(this.itemsCarrousel[0])
      this.isReady = true
    } catch (e) {
      this.stop()
    }
  }

  goRight() {
    if (this.isReady === false) return false
    this.isReady = false
    const firstItem = this.itemsCarrousel[0]
    firstItem.classList.add('will-change')
    firstItem.style.marginLeft = `-${this.sizeOffset}px`
    setTimeout(() => {
      this.parentContainer.append(firstItem)
      firstItem.classList.add('without-transition')
      firstItem.style.marginLeft = '0'
      firstItem.classList.remove('without-transition', 'will-change')
      this.isReady = true
    }, 400)
  }

  goLeft() {
    if (this.isReady === false) return false
    this.isReady = false
    const lastItem = this.itemsCarrousel[this.itemsCarrousel.length - 1]
    lastItem.classList.add('without-transition', 'will-change')
    lastItem.style.marginLeft = `-${this.sizeOffset}px`
    this.parentContainer.prepend(lastItem)

    setTimeout(() => {
      lastItem.classList.remove('without-transition')
      lastItem.style.marginLeft = '0'
      lastItem.classList.remove('will-change')
      this.isReady = true
    }, 200)

    if (this.isOnPause === true) return true

    this.isOnPause = true
    const timeOfPause = Date.now() + (this.timeInterval * 1.25),
      intervalOnPause = setInterval(() => {
        if (Date.now() >= timeOfPause) {
          this.isOnPause = false
          clearInterval(intervalOnPause)
        }
      }, 1000)
  }

  run() {
    if (this.timeInterval) {
      this.intervalID = setInterval(() => {
        if (this.isOnPause === false)
          this.goRight()
      }, this.timeInterval)
    }
  }

  stop() {
    this.isReady = false
    this.isOnPause = true
    clearInterval(this.intervalID)
  }

  updatingCarousel() {
    this.init(this.settings)
    if (this.isReady === false && this.isOnPause === true) return false
    this.run()
  }
}

function calculateSizeItem(elem) {
  return elem.offsetWidth + serializeStyles(getComputedStyle(elem).marginLeft) + serializeStyles(getComputedStyle(elem).marginRight)
}

function serializeStyles(text) {
  return parseInt(text.replace(/\D/ig, ''))
}

export default InfiniteCarousel