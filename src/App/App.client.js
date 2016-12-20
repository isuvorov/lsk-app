import ReactApp from 'lego-starter-kit/ReactApp'
import routes from './routes';

export default class App extends ReactApp {

  static Html = require('./Html').default
  Provider = require('./stores/AppStore').default

  getUniversalRoutes() {
    return routes
  }

}
