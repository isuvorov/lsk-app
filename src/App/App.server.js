import MobxApp from 'lego-starter-kit/MobxApp'
import getApi from './api'
import getDocs from './api/api.docs'
import routes from './routes'
import assets from './assets'; // eslint-disable-line import/no-unresolved
import AppState from './AppState'

export default class BdoApp extends MobxApp {

  useRoutes() {
    this.app.all('/api', (req, res) => {
      return res.json({ message: 'Current API version is here: /api/v1', url: '/api/v1' })
    })
    this.app.use('/api/v1', this.getDocsRouter(getDocs, {
      v: 1,
      path: '/api/v1',
    }))
    this.app.use('/api/v1', getApi(this))
    this.useStaticPublic(__dirname + '/public')
  }

  useWebSockets() {

  }

  renderHtml(...args) {
    return require('./renderHtml').default(...args)
  }

  getUniversalRoutes() {
    return routes
  }

  getAssets() {
    return assets.main
  }

  getAppState(initialState) {
    return new AppState(initialState)
  }

}
