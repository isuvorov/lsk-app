import ReactApp from 'lego-starter-kit/ReactApp'

export default class App extends ReactApp {

  static Html = require('./Html').default
  Provider = require('./stores/AppStore').default

  getUniversalRoutes() {
    return require('./routes').default
  }

  hmrInit() {
    if (module.hot) {
      module.hot.accept('./routes', () => {
        this.hmrUpdate()
      });
    }
  }

}
