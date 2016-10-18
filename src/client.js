import polyfill from 'lego-starter-kit/utils/polyfill'
import App from './App'
import config from './config/index.client'
polyfill()
const ctx = { config }
const app = new App(ctx)
app.run().then(() => {
  console.log(`🎃  The client is running [${global.timing()}ms]`)
})
