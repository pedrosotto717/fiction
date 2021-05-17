import { makeBackDrop } from "../services/API.js"

export function makeBackGround(image = "") {
  if (image === "") return `url('')`
  return `url(../.${makeBackDrop(image)})`
}