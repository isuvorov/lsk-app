import React, { Component } from 'react';
import CategoryPage from '../CategoryPage';


export default {
  async action({ page }) {
    return page
    .isAuth()
    .component(CategoryPage, {
      title: 'Quizard',
      subtitle: 'Система обучения и тестирования сотрудников',
      image: '//pp.userapi.com/c636819/v636819936/34bbb/Eb4xNlxK7ys.jpg',
      categories: [{
        link: '/game/create?categoryId=quizard1&platform=quizard',
        image: 'http://media.istockphoto.com/photos/worker-at-hardware-store-picture-id505747518?k=6&m=505747518&s=170667a&w=0&h=XYesI0oWGFPQEprAombnOoVLjIvPapCT2hm7TQxW6fs=',
        title: 'Знание ассортимента',
      }, {
        link: '/game/create?categoryId=quizard1&platform=quizard',
        image: 'https://www.bls.gov/ooh/images/1580.jpg',
        title: 'Навыки продаж',
      }, {
        link: '/game/create?categoryId=quizard1&platform=quizard',
        image: 'http://blogs.salleurl.edu/antiguos-alumnos/files/2014/05/1.jpg',
        title: 'Стратегия компании',
      }],
    });
  },
};
