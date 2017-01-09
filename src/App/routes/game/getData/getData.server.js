
export default async (ctx, app, params) => {
  if (!ctx.rootState) ctx.rootState = {}

  const { Game } = app.models

  const game = await Game.findById(params.id)
  const data = {
    game,
  }

  ctx.rootState.pageData = data

  return ctx.rootState.pageData
}
