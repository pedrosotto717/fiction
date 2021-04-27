export function cutText(text, length = 220) {
  if(text.length < length) return text
  const lastPosition = text.substring(0, length).lastIndexOf(" ");
  return text.substring(0, lastPosition).concat(" ...");
}