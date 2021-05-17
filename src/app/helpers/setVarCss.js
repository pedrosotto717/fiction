export function setVarCss(selector, nameProperty, value) {
  const $element = document.querySelector(selector) || null
  if ($element === null) return false
  $element.style.setProperty(nameProperty, value)
}
