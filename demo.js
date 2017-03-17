const qwe = {
  a: 1,
  b: 3, c: 4
};

/*

 */


const a = [1, 2, 3, 4, 5]
const b = [
  1, 2, 3,
  4, 5, 6,
  4, 5, 6,
  4, 5, 6,
  4, 5, 6,
  4, 5, 6,
  4, 5, 6,
  4, 5, 6,
]



import React, { Component } from 'react'
import AppForm from 'lsk-quiz/Quiz/AppForm'
import CertForm from 'lsk-quiz/Cert/CertForm'
import Api from '../../api/api.client'

import Slide from 'lsk-general/General/Slide'
import { Grid } from 'react-bootstrap'


// import HomePage from './HomePage'
import getData from './getData'
export default {
  path: '/game/:id',
  async action({ app, ctx, params, next }) {
    const data = await getData(ctx, app, params);
    const game = data.game;
    // console.log(game);


    if (game.result) {

      const data = {
        number: 'AA 123456',
        title: 'за 3 место',
        theme: 'Параллельное программирование',
        date: '2016-03-18',
      }

      return {
        component: <Slide
          fixed
          full
          image={require('./bg.jpg')}
        >
          <CertForm data={data} />
        </Slide>
      }
    }
    const test = {
      tasks: game.tasks,
    }

    async function onFinish(answers) {
      const api = new Api({
        base: '/',
      })
      return await api.fetch(`/game/save?id=${params.id}`, {
        method: 'POST',
        body: { answers },
      })
      .then(res => {
        location.reload();
      })
      .catch(err => {
        console.log({err});
      })
    }

    if (test.tasks && test.tasks[0].platform === 'quizard') {

      return {
        component: <Slide
          fixed
          full
          image={require('./bg2.jpg')}
        >
          qweqweqweqw
        </Slide>
      }
    }
    //
    //
    return {
      component: <Slide
        fixed
        full
        image={require('./bg.jpg')}
      >
        <AppForm test={test} onFinish={onFinish} />
      </Slide>
    }
  },
};
