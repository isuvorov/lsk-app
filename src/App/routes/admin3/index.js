import GamesPage from '../cabinet/GamesPage';

export default {
  action({ next, page }) {
    return page
      .isUserRole('admin')
      .pushTitle('Admin')
      .next(next);
  },
  children: [
    {
      path: '/',
      async action({ uapp, page }) {
        const { Game } = uapp.umodels;
        const games = await Game.find();
        return page
          .pushTitle('All games')
          .component([GamesPage, { games, showAll: true }]);
      },
    },
    {
      path: '*',
      action() {
        throw 'Not found in cabinet';
      },
    },
  ],

};
