function calculateSizeItem(elem) {
  return elem.offsetWidth + serializeStyles(getComputedStyle(elem).marginLeft) + serializeStyles(getComputedStyle(elem).marginRight)
}

function serializeStyles(text) {
  return parseInt(text.replace(/\D/ig, ''))
}

function carousel({ container, classItems }) {
  const parentContainer = typeof container === 'string' ? document.querySelector(container) : container,
    itemsCarrousel = document.getElementsByClassName(classItems)

  let isReady = true

  const sizeOffset = calculateSizeItem(itemsCarrousel[0])
  console.log(sizeOffset)

  const goRight = function() {
    if (isReady === false) return false
    isReady = false
    const firstItem = itemsCarrousel[0],
      delay = serializeStyles(getComputedStyle(firstItem).transitionDuration)

    firstItem.style.marginLeft = `-${sizeOffset}px`

    setTimeout(() => {
      parentContainer.append(firstItem)
      firstItem.style.marginLeft = ''
      isReady = true
    }, delay * 120)
  }

  const goLeft = function() {
    if (isReady === false) return false
    isReady = false
    const lastItem = itemsCarrousel[itemsCarrousel.length - 1]
    lastItem.style.marginLeft = `-${sizeOffset}px`
    parentContainer.prepend(lastItem)
    setTimeout(() => lastItem.style.marginLeft = '', 200)
    setTimeout(() => isReady = true, 400)
  }
  return [goLeft, goRight]
}

export default carousel