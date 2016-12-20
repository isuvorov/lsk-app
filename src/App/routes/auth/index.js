 import AuthPage from './AuthPage'
export default {
  // path: '/',
  children: [
    {
      path: '/',
      action() {
        return {
          title: 'Cabinet',
          component: <AuthPage />,
        }
      },
    },
    {
      path: '/login',
      action() {
        return {
          title: 'login',
          component: <div>login</div>,
        }
      },
    },
    {
      path: '/logout',
      action() {
        return {
          title: 'logout',
          component: <div>logout</div>,
        }
      },
    },
    {
      path: '*',
      action() {
        throw 'Not found in auth'
      },
    },
  ],
  action: () => console.log('checking child routes for /posts'),
  // async action({ next }) {
  //   return await next();
  //   const route = await next();
  //
  //   route.component = <div>
  //     Auth header
  //     <hr />
  //     {route.component}
  //   </div>
  //   return route;
  // },

};
