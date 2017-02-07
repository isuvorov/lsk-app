import config from 'lego-starter-kit/utils/config';
import baseConfig from 'lego-starter-kit/config';

export default config.server(baseConfig, {
  client: require('./client').default, // eslint-disable-line

  env: process.env.NODE_ENV || process.env.ENV || 'development',
  port: process.env.PORT || 8080,

  protocol: 'https',

  db: process.env.DB || 'mongodb://localhost:10008/momentum',
  jwt: {
    secret: 'momentum123',
  },
});
