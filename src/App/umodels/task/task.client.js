import { doClientRequest, createClientAction, connectAction } from 'universal-model';

export default (ctx) => ({

  getTasks: createClientAction({
    // api,
    model: 'task',
    action: 'getTasks',
    // onSuccess: Date,
  })
  // getTasks() {
  //   return [1, 2, 3];
  // },
});
