import { AppContext } from '../states/AppContext.js'

export function stopLoader() {
  const [_, setContext] = AppContext.provider()
  setContext({ loading: false })
}