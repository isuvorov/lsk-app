

export default ctx => ({
  universalActions: ['find', 'findOne'],
  find(...args) {
    const { Game } = ctx.models;
    console.log('find', args[0]);
    return Game.find(...args);
  },
  findOne(...args) {
    const { Game } = ctx.models;
    return Game.findOne(...args);
  },
});
