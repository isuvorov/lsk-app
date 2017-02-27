import { createRoute, createSocketNamespace } from 'universal-model';
import _ from 'lodash';
import asyncRouter from 'lego-starter-kit/utils/AsyncRouter';
import Note from './Note';


export default function getApi(ctx, params) {
  const api = ctx.asyncRouter();
  const models = ctx.umodels;
  console.log({models});

  api.all('/test', (req) => {
    console.log('test');
    const pet = new ctx.models.Pet();

    pet.test();
  });

  api.all('/universal', createRoute({ ...ctx, models }));
  ctx.app.ws('/universal', createSocketNamespace({ ...ctx, models }))

  // api.all('/universal-socket', createRoute({...ctx, models, socket: true}));
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
