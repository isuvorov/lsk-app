import React, { Component } from 'react'
import MomentumPage from 'lsk-quiz/Abp/MomentumPage'

// import HomePage from './HomePage'
import getData from './getData'
export default {
  path: '/',
  async action({ app, ctx, next }) {
    const data = await getData(ctx, app);
    //
    //
    return {
      component: <MomentumPage data={data} />
    }
  },
};
