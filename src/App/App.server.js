import ReactApp from 'lego-starter-kit/ReactApp'; // eslint-disable-line
import _ from 'lodash';

import getApi from './api/v1';
import getDocs from './api/v1/v1.docs';
import routes from './routes';
import assets from './assets'; // eslint-disable-line


export default class App extends ReactApp {


  getModels() {
    return {
      ...super.getModels(),
      ...require('./models').default(this), // eslint-disable-line
    };
  }

  getUmodels() {
    return {
      ...require('./umodels').default(this), // eslint-disable-line
    };
  }

  init(...args) {
    super.init(...args);
    this.umodels = require('./umodels').default(this);
  }

  useRoutes() {
    this.app.enable('trust proxy');
    this.app.all('/api', (req, res) => res.json({ message: 'Current API version is here: /api/v1', url: '/api/v1' }));
    this.app.use('/api/v1', this.getDocsRouter(getDocs, {
      v: 1,
      path: '/api/v1',
    }));
    this.app.use('/api/v1', getApi(this));
    this.app.use('/game', require('./api/game/game').default(this));


  }

  getStatics() {
    const statics = super.getStatics();
    if (__DEV__) {
      statics['/storage'] = `${__dirname}/../storage`
    }
    return statics;
  }


  getAssets() {
    return assets.main;
  }

  static Html = require('./Html').default; // eslint-disable-line
  Provider = require('./stores/AppStore').default; // eslint-disable-line

  getUniversalRoutes() {
    return routes;
  }

}
