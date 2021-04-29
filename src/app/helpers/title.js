
export function setTitle(title) {
  const $titleTag = document.documentElement.getElementsByTagName('title')[0]
  $titleTag.innerText = `${title}`
}