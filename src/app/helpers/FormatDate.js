export function formatDate(date) {
  const fullDate = new Date(date)
  return fullDate.toUTCString().replace(' 00:00:00 GMT', '')
}