import GamesPage from './GamesPage';

export default {
  action({ next, page }) {
  // action({ next, page, uapp, ...ctx }) {
    // if (!uapp.rootState.user) {
    //   return page.redirect('/auth/login');
    // }
    //
    // page
    //   .pushTitle('Cabinet')
    //   .layout(Cabinet);
    //
    // return next();
    return page
      .isAuth()
      .pushTitle('Cabinet')
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ uapp, page }) {
        const { Game } = uapp.umodels;
        const games = await Game.find({ userId: '58b65f664dfc435d02eb3aa3' });
        // const games = await Game.find({ users: { $in: ['58b65f664dfc435d02eb3aa3'] } });
        return page
          .pushTitle('All games')
          .component([GamesPage, { games }]);
      },
    },
    // {
    //   path: '/profile',
    //   action({ page }) {
    //     return page
    //       .pushTitle('Profile')
    //       .layout(null)
    //       .component(<ProfilePage />);
    //   },
    // },
    {
      path: '*',
      action() {
        throw 'Not found in cabinet';
      },
    },
  ],

};
