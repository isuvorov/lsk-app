import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import CategoryPage from '../CategoryPage';

export default {
  async action({ app, ctx, next, appStore}) {
    if (!appStore.auth.isAuth) return {redirect:'/auth'}
    return {
      component: <CategoryPage
        user={appStore.auth.user}
        title="Академия продаж"
        subtitle="2 ступень"
        image="https://pp.vk.me/c636819/v636819936/3474a/g6I0ETjiQ4I.jpg"
        categories={[
          {
            link: '/game/create?categoryId=quizard1',
            image: 'http://media.istockphoto.com/photos/worker-at-hardware-store-picture-id505747518?k=6&m=505747518&s=170667a&w=0&h=XYesI0oWGFPQEprAombnOoVLjIvPapCT2hm7TQxW6fs=',
            title: 'Знание ассортимента',
          },
        ]}
      />,
    };
  },
};
