import spin from "../../assets/images/tail-spin.svg";

export default function Loader() {
  return (
    `<div class="local-loader">
      <img src=${spin} width="75" alt="Loading">
    </div>`
  )
}