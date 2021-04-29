import { makeBackDrop } from "../services/API.js"

export function makeBackGround(image = "") {
  if (image === "") return image
  return `url(../.${makeBackDrop(image)})`
}