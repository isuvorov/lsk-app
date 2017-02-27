import { doClientRequest, createClientAction, connectAction } from 'universal-model';

class TaskClient {
  constructor(json) {
    Object.assign(this, json);
  }
  getImage() {
    return `https://hijay-dev.mgbeta.ru${this.coverImage}`;
  }
}

const undesialize = (json) => {
  return new TaskClient(json);
}

const arrayUndesialize = (arr) => {
  return arr.map(json => new TaskClient(json))
}

export default (ctx) => {
  console.log('ctx.provider.api', ctx.provider.api);

  return {

  getTasks: createClientAction({
    api: ctx.provider.api,
    model: 'task',
    action: 'getTasks',
    deserialize: arrayUndesialize, //
  }),
  find: createClientAction({
    api: ctx.provider.api,
    model: 'task',
    action: 'find',
    deserialize: arrayUndesialize, //
  }),
  findOne: createClientAction({
    api: ctx.provider.api,
    model: 'task',
    action: 'findOne',
    deserialize: undesialize, //
  }),
  // getTasks() {
  //   return [1, 2, 3];
  // },
}};
