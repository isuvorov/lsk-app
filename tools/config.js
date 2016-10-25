import fs from 'fs'
const dirname = __dirname + '/..'
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  dirname,
  pkg: require('../package.json'),
  deps: [
    {
      name: 'lego-starter-kit',
      path: fs.realpathSync(dirname + '/node_modules/lego-starter-kit/src'),
      alias: 'lego-starter-kit',
    },
    {
      name: 'lsk-general',
      path: fs.realpathSync(dirname + '/node_modules/lsk-general/src'),
      alias: 'lsk-general',
    },
  ],
}
export default ctx
