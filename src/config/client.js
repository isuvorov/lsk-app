import config from 'lego-starter-kit/config/client';
export default config.extend({
  site: {
    abbr: 'T',
    title: 'Тестирование',
    description: 'The Description',
    copyright: '2016-2017',
    slide: {
      image: 'http://race-robotics.com/wp-content/uploads/2016/10/yumi-abb-robot.jpg',
      video: null,
    },
  },

  url: 'http://localhost:3000',
  api: {
    base: '/api/v1',
  },
  host: 'http://localhost:3000', // depreacated

  auth: {
    profile: {
      firstName: {
        required: true,
        title: 'Имя',
        control: {
          placeholder: 'Например, Александр',
        },
        validate: {
          presence: {
            message: 'Поле не должно быть пустым.',
          },
          email: {
            message: 'Введите корректный адрес почты.',
          },
        },
      },
      lastName: {
        required: true,
        title: 'Фамилия',
        control: {
          placeholder: 'Например, Пушкин',
        },
        validate: {
          presence: {
            message: 'Поле не должно быть пустым',
          },
        },
      },
      middleName: {
        title: 'Отчество',
        control: {
          placeholder: 'Например, Сергеевич',
        },
      },
      icq: {
        title: 'ICQ',
        control: {
          placeholder: 'Например, 336-844-366',
        },
      },
    },
    signup: ['lastName', 'firstName', 'middleName'],
    // socials: ['vkontakte', 'youtube'],
  },
});


// import config from 'lego-starter-kit/utils/config';
// import baseConfig from 'lego-starter-kit/config/client';
//
// export default config.client(baseConfig, {
//   siteTitle: 'The Site Title',
//   api: {
//     base: '/api/v1',
//   },
//   host: __DEV__ ? 'http://localhost:3000' : 'http://momentum.ru',
//   ykassa: require('./ykassa').default,
// });
