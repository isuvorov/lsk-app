import React, { Component } from 'react'
import AppForm from 'lsk-quiz/Quiz/AppForm'
import CertForm from 'lsk-quiz/Quiz/CertForm'
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
    console.log(game);


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
          image={require('./bg.jpg')}
        >
          <CertForm data={data} />
        </Slide>
      }
    }
    const test = {
      tasks: game.tasks,
    }
    console.log(test);


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
    //
    //
    return {
      component: <AppForm test={test} onFinish={onFinish} />
    }
  },
};
