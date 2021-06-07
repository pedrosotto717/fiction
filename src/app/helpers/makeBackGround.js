import { makeBackDrop } from "../services/API.js"

export function makeBackGround(image = "", size = 'original') {
  if (image === "") return `url('')`
  return `url(${makeBackDrop(image, size)})`
}