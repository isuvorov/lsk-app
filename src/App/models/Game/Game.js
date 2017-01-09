import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema'


export function getSchema(ctx) {
  // const mongoose = ctx.db;
  const schema = new UniversalSchema({
    userId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    userInfo: {
      type: Object,
    },
    tasks: {
      type: Array,
    },
    answers: {
      type: Array,
    },
    result: {
      type: Object,
    },
  })

  return schema
}


export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db.model('Game', schema.getMongooseSchema(), 'game')
}
