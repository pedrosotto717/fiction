export default function({className = '', index = 0}) {
  return (
    `<div class=${className}>
      <a href="#/movie/${index}">${index}</a>
    </div>`
  )
}
