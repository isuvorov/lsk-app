import _ from 'lodash';
import { csv2grid, grid2objects } from 'jsongrid';

function castTask(task) {
  if (!task.answers) return task.toObject();

  const values = _.shuffle(_.range(task.answers.length));

  return {
    ...task.toObject(),
    answersView: undefined,
    answers: undefined,
    checker: {
      type: 'match',
      value: values[0],
    },
    decision: {
      type: 'button',
      view: '2column',
      options: _.shuffle(task.answers.map((answer, index) => {
        const res = {
          value: values[index],
          title: answer.title,
        };
        if (answer.text) {
          res.text = answer.text;
        }
        return res;
      })),
    },
  };
}


export default function getApi(ctx, params) {
  const api = ctx.asyncRouter();
  const { Task, Game } = ctx.models;

  api.get('/import', async (req, res) => {
    const tasksSourse = require('./questions').default((grid2objects(csv2grid(
      // https://docs.google.com/spreadsheets/d/1ijbzVAIGC7JBdvjrLrP6FE3v5-S91hVPBKwAcTZQ6Sw/edit#gid=0
      require('raw!./questions.txt'),
    )))).reverse();
    // console.log(require('raw!./questions.txt'));
    // console.log(tasksSourse);

    // const task = new Task(tasksSourse[0])
    // console.log(task, tasksSourse);
    // return await task.save()
    const criteria = { platform: { '$in': ['lico', 'quizard'] } }; // eslint-disable-line
    await Task.remove(criteria);
    await Task.create(tasksSourse);
    return await Task.find(criteria);
  });

  api.get('/create', async (req, res) => {
    if (!req.user || !req.user._id) throw '!user';
    const userId = req.user._id;
    const { categoryId, platform } = req.query;

    // console.log({categoryId});
    let tasks = (await Task.find({ categoryId })).map(castTask);
    // console.log({ tasks, categoryId });
    if (!tasks || !tasks.length) throw '!tasks';

    if (platform === 'lico') {
      const groups = _.groupBy(tasks, t => (t.group || 'default'));
      if (__DEV__) {
        tasks = [groups.default[0]];
      } else {
        tasks = [
          ..._.shuffle(_.sampleSize(groups.default, 10)),
          ..._.shuffle(groups.advanced || []),
        ];
      }
    } else {
      tasks = _.sampleSize(tasks, 7);
    }
    if (__DEV__) {
      tasks = [tasks[tasks.length - 1]];
    }

    if (!tasks.length) {
      throw 'По данной теме нету вопросов';
    }

    const game = new Game({ tasks, categoryId, users: [userId], userId });
    await game.save();
    return res.redirect(`/game/${game.id}`);
  });

  api.post('/save', async (req, res) => {
    const { id } = req.query;
    const gameData = req.body.game;
    // console.log({gameData});
    const game = await Game.findById(id);
    if (!game) throw 404;

    // @TODO: Merge decisions, events, results
    game.decisions = gameData.decisions;
    game.events = gameData.events;
    game.results = gameData.results;
    game.startedAt = gameData.startedAt;
    game.raw = gameData;
    // game.finishedAt = gameData.finishedAt;
    if (game.results) {
      game.finishedAt = new Date();
    }

    return game.save();

    // return {
    //   gameData,
    //   game,
    //   // body: req.body,
    // }
    //
    // game.answers = req.body.answers;
    // const result = {
    //   count: game.tasks.length,
    //   correct: 0,
    // };
    //
    // game.answers.map((answer, index) => {
    //   result.correct += game.tasks[index].checker.value === answer;
    // });
    // result.score = result.correct / result.count;
    // game.result = result;
    // game.finishedAt = new Date();
    // await game.save();
    // return res.json(game);
  });

  api.post('/answer', async (req, res) => {
    const { id } = req.query;
    const game = await Game.findById(id);
    game.answers = req.body.answers;
    const result = {
      count: game.tasks.length,
      correct: 0,
    };

    game.answers.map((answer, index) => {
      result.correct += game.tasks[index].checker.value === answer;
    });
    result.score = result.correct / result.count;
    game.result = result;
    game.finishedAt = new Date();
    await game.save();
    return res.json(game);
  });

  api.post('/cert', async (req, res) => {
    const { id } = req.query;
    const game = await Game.findById(id);
    game.cert = req.body.cert;
    await game.save();
    return res.json(game);
  });

  api.get('/buy', async (req, res) => {
    const { id } = req.query;
    const game = await Game.findById(id);
    game.boughtAt = new Date();
    await game.save();
    return res.redirect(`/game/${game.id}`);
  });

  return api;
}
