import Context from "../prottoDom/Context.js";

const AppContext = Context.create({
  name: 'AppContext',
  state: {
    loading: true
  }
});

export { AppContext }