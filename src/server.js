import ready from 'lego-starter-kit/utils/polyfill';
import App from './App';
import config from './config';
ready();
global.__IE__ = false

const app = new App({ config });
app.run().then(() => {
  console.log(`🎃  The server is running at http://127.0.0.1:${app.config.port}/ [${global.timing()}ms]`);
});

// const stories = require('glob?patterns=1!./test.glob.js')
// console.log('storiesqwe', stories);
