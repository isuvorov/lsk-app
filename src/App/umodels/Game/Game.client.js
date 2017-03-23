import { createClientActions } from 'universal-model';

class GameClient {
  constructor(json) {
    Object.assign(this, json);
  }
  getImage() {
    return `https://static.mgbeta.ru${this.coverImage}`;
  }
}

export default (ctx) => {
  return {
    ...createClientActions({
      api: ctx.provider.api,
      model: 'Game',
      actions: ['find'],
      format: [GameClient],
    }),
    ...createClientActions({
      api: ctx.provider.api,
      model: 'Game',
      actions: ['findOne'],
      format: GameClient,
    }),
  };
};
