import { swipeLeft, swipeRight } from './_touch.js'

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

    document.addEventListener('click', ev => {
      if(ev.target.matches(settings.prevSelector) || ev.target.matches(`${settings.prevSelector} *`))
        this.goLeft()
    });
    
    document.addEventListener('click', ev => {
      if(ev.target.matches(settings.nextSelector) || ev.target.matches(`${settings.nextSelector} *`))
        this.goRight()
    })


    swipeLeft(() => {
      this.goLeft()
    }, `${this.settings.container} *`)

    swipeRight(() => {
      this.goRight()
    }, `${this.settings.container} *`)


    addEventListener('resize', () => {
      let newSize = calculateSizeItem(this.itemsCarrousel[0])
      this.sizeOffset = newSize < (this.sizeOffset * 1.25) ? newSize : this.sizeOffset
    })

    this.init(this.settings)
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
    } catch (e) {
      this.stop()
    }
  }

  goRight() {
    if (this.isReady === false) return false
    this.isReady = false
    const firstItem = this.itemsCarrousel[0]
    firstItem.style.marginLeft = `-${this.sizeOffset}px`
    setTimeout(() => {
      this.parentContainer.append(firstItem)
      firstItem.classList.add('without-transition')
      firstItem.style.marginLeft = '0'
      firstItem.classList.remove('without-transition')
      this.isReady = true
    }, 400)
  }

  goLeft() {
    if (this.isReady === false) return false
    this.isReady = false
    const lastItem = this.itemsCarrousel[this.itemsCarrousel.length - 1]
    lastItem.classList.add('without-transition')
    lastItem.style.marginLeft = `-${this.sizeOffset}px`
    this.parentContainer.prepend(lastItem)

    setTimeout(() => {
      lastItem.classList.remove('without-transition')
      lastItem.style.marginLeft = '0'
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
    clearInterval(this.intervalID)
    this.isReady = false
    this.isOnPause = true
    this.intervalID = 0
  }

  updatingCarousel() {
    this.init(this.settings)
    if (this.intervalID !== 0) {
      this.run()
    }
  }
}

function calculateSizeItem(elem) {
  return elem.offsetWidth + parseInt(getComputedStyle(elem).marginLeft) + parseInt(getComputedStyle(elem).marginRight)
}

export default InfiniteCarousel