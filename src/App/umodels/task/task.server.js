
export default ctx => ({
  universalActions: ['getTasks', 'find', 'findOne'],
  getTasks() {
    const { Task } = ctx.models;
    return Task.find();
  },
  find(...args) {
    console.log({ args });
    const { Task } = ctx.models;
    return Task.find(...args);
  },
  findOne(...args) {
    const { Task } = ctx.models;
    return Task.findOne(...args);
  },
});
