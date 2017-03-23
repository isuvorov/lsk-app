import React, { Component } from 'react';
import CategoryPage from '../CategoryPage';


export default {
  async action({ app, ctx, next, appStore }) {
    if (!appStore.auth.isAuth) return { redirect: '/auth' };

    return {
      title: 'Главная',
      component: <CategoryPage
        user={appStore.auth.user}
        title="Академия Продаж"
        subtitle="2 ступень"
        image="http://race-robotics.com/wp-content/uploads/2016/10/yumi-abb-robot.jpg"
        categories={[
          {
            link: '/game/create?categoryId=lico1&platform=lico',
            image: 'http://media.istockphoto.com/photos/worker-at-hardware-store-picture-id505747518?k=6&m=505747518&s=170667a&w=0&h=XYesI0oWGFPQEprAombnOoVLjIvPapCT2hm7TQxW6fs=',
            // title: 'Анализ клиента',
            title: 'Анализ клиента и построение стратегии продаж Smart Selling',
          },
          {
            link: '/game/create?categoryId=lico3&platform=lico',
            image: 'https://www.bls.gov/ooh/images/1580.jpg',
            title: 'Система выгод для клиента и убедительная аргументация АВВ',
          },
          {
            link: '/game/create?categoryId=lico3&platform=lico',
            image: 'http://blogs.salleurl.edu/antiguos-alumnos/files/2014/05/1.jpg',
            // title: 'Переговоры по продаже',
            title: 'Эффективное ведение переговоров по продаже',
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
