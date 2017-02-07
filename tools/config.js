import fs from 'fs';
const dirname = `${__dirname}/..`;
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  dirname,
  pkg: require('../package.json'),
  deps: [
    {
      name: 'lego-starter-kit',
      path: fs.realpathSync(`${dirname}/node_modules/lego-starter-kit/src`),
      alias: 'lego-starter-kit',
    },
    {
      name: 'lsk-general',
      path: fs.realpathSync(`${dirname}/node_modules/lsk-general/src`),
      alias: 'lsk-general',
    },
    {
      name: 'lsk-quiz',
      path: fs.realpathSync(`${dirname}/node_modules/lsk-quiz/src`),
      alias: 'lsk-quiz',
    },
    // {
    //   name: 'universal-model',
    //   path: fs.realpathSync(`${dirname}/node_modules/universal-model/src`),
    //   alias: 'universal-model',
    // },
  ],
  alias: {
    react: fs.realpathSync(`${dirname}/node_modules/react`),
    'react-dom': fs.realpathSync(`${dirname}/node_modules/react-dom`),
  },
};
export default ctx;
