import ProfilePage from './ProfilePage';
export default {
  // path: '/',
  children: [
    {
      path: '/',
      action({ uapp, page }) {
        // console.log(123123123, ctx);
        return {
          title: 'Cabinet',
          component: <ProfilePage />,
        };
      },
    },
    {
      path: '/profile',
      action() {
        return {
          title: 'profile',
          component: <ProfilePage />,
        };
      },
    },
    {
      path: '*',
      action() {
        throw 'Not found in cabinet';
      },
    },
  ],
  async action({ next }) {
    const route = await next();

    // route.component = <div>
    //   Cabinet header
    //   <hr />
    //   {route.component}
    // </div>
    return route;
  },

};
