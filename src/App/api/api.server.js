import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import Note from './Note';
// import { createRpcRoute } from 'universal-model'


export default function getApi(ctx, params) {
  const api = ctx.asyncRouter();

  api.all('/test', (req) => {
    console.log('test');
    const pet = new ctx.models.Pet()

    pet.test();
  });
  api.all('/auth/login', ctx.resourses.Auth.login);
  api.all('/auth/signup', ctx.resourses.Auth.signup);
  api.all('/auth/recovery', ctx.resourses.Auth.recovery);
  api.all('/auth/recovery', ctx.resourses.Auth.recovery);
  // api.all('/rpc', createRpcRoute(ctx.models))

  api.all('/notes*', async (req, res) => {
    const path = req.path.substr('/notes'.length);
    try {
      const md = await Note.get(path);
      return md;
    } catch (err) {
      throw ctx.errors.e404();
    }
  });


  api.all('*', () => 'Mobx API working');
  return api;
}
