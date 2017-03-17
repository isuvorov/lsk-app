
class Model {
  some() {

  }
  static someStatic() {

  }
}
//
// const statics = Model.c
// const instanceMethods = Object.keys(Model.prototype).filter(key => typeof Model.prototype[key] === 'function')
//
//
//
// const staticMethods = Object.keys(Model).filter(typeof Model.prototype[key] === 'function')

export default (static, constructor) => {


  return {

  getTasks: createClientAction({
    api: ctx.provider.api,
    model: 'task',
    action: 'getTasks',
    deserialize: transformArray, //
  }),
  find: createClientAction({
    api: ctx.provider.api,
    model: 'task',
    action: 'find',
    deserialize: transformArray, //
  }),
  findOne: createClientAction({
    api: ctx.provider.api,
    model: 'task',
    action: 'findOne',
    deserialize: transform, //
  }),
  // getTasks() {
  //   return [1, 2, 3];
  // },
}};
