
export default async ({ uapp, app, params }) => {
  if (!uapp.rootState) uapp.rootState = {};

  const { Game } = app.models;

  const game = await Game.findById(params.id);
  const data = {
    game,
  };

  uapp.rootState.pageData = data;

  return uapp.rootState.pageData;
};
