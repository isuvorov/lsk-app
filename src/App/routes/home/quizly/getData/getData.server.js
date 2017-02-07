
export default async (ctx, app) => {
  if (!ctx.rootState) ctx.rootState = {}

  const { Category, Tag } = app.models

  const categories = await Category.find()
  const data = {
    cards: categories.map(category => {
      return {
        ...category.toObject(),
        link: '/game/create?categoryId=' + category.categoryId,
      }
    }),
    tags: await Tag.find(),
  }

  ctx.rootState.pageData = data

  return ctx.rootState.pageData
}
