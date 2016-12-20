import ReactApp from 'lego-starter-kit/ReactApp'
import getApi from './api'
import getDocs from './api/api.docs'
import routes from './routes'
import assets from './assets'; // eslint-disable-line import/no-unresolved

export default class App extends ReactApp {

  useRoutes() {
    this.app.all('/api', (req, res) => {
      return res.json({ message: 'Current API version is here: /api/v1', url: '/api/v1' })
    })
    this.app.use('/api/v1', this.getDocsRouter(getDocs, {
      v: 1,
      path: '/api/v1',
    }))
    this.app.use('/api/v1', getApi(this))
  }

  getStatics() {
    return {
      ...super.getStatics(),
      ...{
        '/': __dirname + '/../src/public',
      },
    }
  }

  getAssets() {
    return assets.main
  }



  static Html = require('./Html').default
  Provider = require('./stores/AppStore').default

  getUniversalRoutes() {
    return routes
  }


}
