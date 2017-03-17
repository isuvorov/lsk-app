import React, { Component } from 'react';
import CategoryPage from '../CategoryPage';


export default {
  async action({ app, ctx, next, appStore }) {
    if (!appStore.auth.isAuth) return { redirect: '/auth' };

    return {
      component: <CategoryPage
        user={appStore.auth.user}
        title="Quizard"
        subtitle="Система обучения и тестирования сотрудников"
        image="http://race-robotics.com/wp-content/uploads/2016/10/yumi-abb-robot.jpg"
        categories={[
          {
            link: '/game/create?categoryId=quizard1',
            image: 'http://media.istockphoto.com/photos/worker-at-hardware-store-picture-id505747518?k=6&m=505747518&s=170667a&w=0&h=XYesI0oWGFPQEprAombnOoVLjIvPapCT2hm7TQxW6fs=',
            title: 'Знание ассортимента',
          },
          {
            link: '/game/create?categoryId=quizard1',
            image: 'https://www.bls.gov/ooh/images/1580.jpg',
            title: 'Навыки продаж',
          },
          {
            link: '/game/create?categoryId=quizard1',
            image: 'http://blogs.salleurl.edu/antiguos-alumnos/files/2014/05/1.jpg',
            title: 'Стратегия компании',
          },
        ]}
      />,
    };
  },
};
//
//
// <Route path="about/:userId" component={() => {
//   safsdfsdfsdf
//
//   return
// }} />
