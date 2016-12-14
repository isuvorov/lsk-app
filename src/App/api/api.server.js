import asyncRouter from 'lego-starter-kit/utils/AsyncRouter'


export default function getApi(ctx, params) {
  const api = ctx.asyncRouter();

  api.all('/auth/login', ctx.resourses.Auth.login)
  api.all('/auth/signup', ctx.resourses.Auth.signup)
  api.all('/auth/recovery', ctx.resourses.Auth.recovery)

  api.all('*', () => {
    return 'Mobx API working'
  })
  return api;
}
