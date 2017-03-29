import getData from './getData';

import quizlyGame from './quizlyGame';
import momentumGame from './momentumGame';

export default {
  path: '/game/:id',
  async action(p) {
    await p.appStore.auth.isAuthAsync()
    console.log('/game/id');
    const { page } = p;
    const data = await getData(p);
    console.log({data});
    const game = data.game;
    if (!game.tasks || !game.tasks.length) throw '!game.tasks';
    const platform = game.tasks[0].platform || 'momentum';

    p.game = game;
    p.test = { tasks: game.tasks };
    p.platform = platform;

    console.log({platform});
    const getGameComponent = (platform === 'quizard' || platform === 'lico') ? quizlyGame : momentumGame;
    return page
      .isAuth()
      .component(getGameComponent(p));
  },
};
