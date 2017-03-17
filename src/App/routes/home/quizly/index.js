// import MomentumPage from 'lsk-quiz/Momentum/MomentumPage';
// import getData from './getData';

export default {
  async action({ app, ctx, next }) {
    // const data = await getData(ctx, app);
    return {
      component: <div>quizly</div>,
    };
  },
};
