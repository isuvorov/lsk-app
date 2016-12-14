import HomePage from './HomePage'
import ErrorPage from './ErrorPage'
import Layout from '../components/Layout'
import config from '../../config/index.client'

export default {
  path: '/',
  children: [
    {
      path: '/',
      action() {
        return {
          title: 'HomePage',
          component: <HomePage />,
        }
      },
    },
    {
      path: '/auth',
      ...require('./auth').default,
    },
    {
      path: '/cabinet',
      ...require('./cabinet').default,
    },
    {
      path: '*',
      action() {
        throw 'Not found';
      },
    },
  ],
  async action({ next }) {
    let route;
    try {
      route = await next();
    } catch (err) {
      console.log('err!!!!!!!!!!!!!!!!!!!!!!!!!!!!', err);
      route = {
        title: `!!!Error: ${err}`,
        component: <ErrorPage>{`Error: ${err}`}</ErrorPage>,
      }
    }
    if (!route) route = {}
    route.title = `${route.title || 'Untitled Page'} - ${config.siteTitle}`;
    route.description = route.description || config.siteTitle;
    route.component = <Layout>
      {route.component}
    </Layout>
    return route;
  },
};
