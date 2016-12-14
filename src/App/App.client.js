import ReactApp from 'lego-starter-kit/ReactApp'
import routes from './routes';

export default class App extends ReactApp {
  getUniversalRoutes() {
    return routes
  }

}
