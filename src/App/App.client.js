import MobxApp from 'lego-starter-kit/MobxApp'
import routes from './routes';
import AppState from './AppState'

export default class BdoApp extends MobxApp {
  getUniversalRoutes() {
    return routes
  }

  getAppState(initialState) {
    return new AppState(initialState);
  }

}
