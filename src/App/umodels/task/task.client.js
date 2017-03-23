// export default () => {}

import { createClientActions } from 'universal-model';

// console.log(require('universal-model'));
// layoutFinishContent
// const createClientActions = require('universal-model').default.createClientActions;
class TaskClient {
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
      model: 'task',
      actions: ['getTasks', 'find'],
      format: [TaskClient],
    }),
    ...createClientActions({
      api: ctx.provider.api,
      model: 'task',
      actions: ['findOne', 'findById'],
      format: TaskClient,
    }),
  };

  // return {
  //   _universal: {
  //     api: ctx.provider.api,
  //     model: 'task',
  //   },
  //   ...createClientActions({
  //     action: ['getTasks', 'find'],
  //     format: [TaskClient],
  //   }),
  //   ...createClientActions({
  //     action: ['findOne'],
  //     format: TaskClient,
  //   }),
  // }
};
