import config from 'lego-starter-kit/config/server';
export default config.extend({
  client: require('./client').default, // eslint-disable-line

  port: process.env.PORT || 8080,
  url: process.env.URL || 'http://localhost:3000',

  db: {
    uri: process.env.DB || 'mongodb://s2.mgbeta.ru:10098/momentum',
  },
  jwt: {
    secret: 'momentum123',
  },
  upload: {
    // @TODO: @andruxa externalPath (absolute)
    path: 'storage',
    // exteralPath: '/storage',
    allowGuest: false,
    // allowSetFilename: true,
    maxSize: '50mb',
    // prefix: 'file_',
    // postfix: '',
    // formats: ['png', 'jpg', 'jpeg', 'gif'],
    mimetypes: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
  },
})
.extendEnv();
//
//
// import config from 'lego-starter-kit/utils/config';
// import baseConfig from 'lego-starter-kit/config';
//
// export default config.server(baseConfig, {
//   client: require('./client').default, // eslint-disable-line
//
//   env: process.env.NODE_ENV || process.env.ENV || 'development',
//   port: process.env.PORT || 8080,
//
//   protocol: 'https',
//   sockets: {
//     transports: ['websockets'],
//     enable: true,
//   },
//   db: {
//     uri: process.env.DB || 'mongodb://s2.mgbeta.ru:10098/momentum',
//   },
//   jwt: {
//     secret: 'momentum123',
//   },
// });
