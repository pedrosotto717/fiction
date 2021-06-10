import DOM from "../prottoDom/DOM.js"

export function swipeRight(callback, element) {
  let rCurrentPosX = 0, rOldPosX = 0

  DOM.addEventListener('touchstart', ev => {
    rOldPosX = ev.touches[0].clientX
  }, `${element}`)

  DOM.addEventListener('touchmove', ev => {
    rCurrentPosX = ev.touches[0].clientX
  }, `${element}`)

  DOM.addEventListener('touchend', ev => {
    if (rOldPosX > rCurrentPosX * 1.5)
      callback()
  }, `${element}`)
}

export function swipeLeft(callback, element) {
  let lCurrentPosX = 0, lOldPosX = 0

  DOM.addEventListener('touchstart', ev => {
    lOldPosX = ev.touches[0].clientX
  }, `${element}`)

  DOM.addEventListener('touchmove', ev => {
    lCurrentPosX = ev.touches[0].clientX
  }, `${element}`)

  DOM.addEventListener('touchend', ev => {
    if (lCurrentPosX * 0.55 > lOldPosX)
      callback()
  }, `${element}`)
}
