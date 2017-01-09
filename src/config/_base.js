/* eslint key-spacing:0 spaced-comment:0 */
const pkg = require('../../package.json')
const config = {
  name: pkg.name,
  env : process.env.NODE_ENV || process.env.ENV || 'development',
  port : process.env.PORT || 8080,
  protocol: 'https',
  mail: {
  },
  db: {
    uri: 'mongodb://localhost:10008/momentum',
    options: {},
  },
  jwt: {
    secret: 'momentum123',
  }

}
  // env : process.env.NODE_ENV || process.env.ENV || 'development',
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !process.env.NODEBUG,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

export default config
