import ready from 'lego-starter-kit/utils/polyfill';
import App from './App';
import config from './config/client';
ready();
const ctx = { config };

// global.__IE__ = msieversion()
// console.log('__IE__', __IE__);
// if (__IE__) {
window.matchMedia = window.matchMedia || function () {
  return {


    matches: false,
    addListener() {},
    removeListener() {},
  };
};
// }

const app = new App(ctx);

app.run().then(() => {
  console.log(`🎃  The client is running [${global.timing()}ms]`);
});
