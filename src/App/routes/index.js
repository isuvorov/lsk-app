import HomePage from './HomePage'
import ErrorPage from './ErrorPage'
import Layout from '../components/Layout'

import getData from './data.js'
const data = getData()

export default {
  path: '/',
  children: [
    {
      path: '/',
      action() {
        return {
          title: 'Главная',
          component: <HomePage />,
        }
      },
    },
    {
      path: '*',
      action({ error }) {
        return {
          title: 'ErrorPage',
          component: <ErrorPage />,
          // component: <ErrorPage error={error} />,
        }
      },
    },
  ],

  async action({ next }) {
    let route;
    try {
      route = await next();
    } catch(err) {


    }
    // console.log('action');
    // do {
    //   route = await next();
    // } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - Выездная конференция БДО Юникон Бизнес Солюшнс`;
    route.description = route.description || 'Выездная конференция БДО Юникон Бизнес Солюшнс';
    route.component = <Layout>
      {route.component}
    </Layout>

    return route;
  },

  // async action({ next, context }) {
  //   const component = await next();
  //   if (component === undefined) return component;
  //   return render(
  //     <App context={context}>
  //       {component}
  //     </App>
  //   );
  // },
};
