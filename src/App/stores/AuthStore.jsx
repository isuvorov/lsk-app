import { observable } from 'mobx';
import cookie from 'react-cookie';
import _ from 'lodash';

function getHash(str) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function loginAuthVk() {
  return new Promise((resolve, reject) => {
    VK.Auth.login((vk) => {
      // console.log('vk', vk);
      VK.Api.call('users.get', {
        user_ids: vk.session.user.id,
        fields: 'counters, city, photo_max, photo_max_orig',
      }, (res) => {
        if (!res.response) return reject(res)
        // console.log('res1', res);
        const user = res.response[0]
        const pack = {}
        pack.id = user.uid
        pack.session = _.pick(vk.session, ['expire', 'mid', 'sid', 'sig', 'secret'])
        pack.user = {
          name: `${user.first_name} ${user.last_name}`,
          avatar: user.photo_max,
          cover: user.photo_max_orig,
        }
        VK.Api.call('database.getCitiesById', {
          city_ids: user.city,
        }, (res) => {
          if (!res.response) return reject(res)
          pack.user.location = res.response[0].name
          resolve(pack)
        })
      });
    }, 4194304)
  })
}


export default class AuthStore {
  constructor(app) {
    this.app = app
  }

  @observable token = null
  @observable user = null
  @observable isAuth = null


  promise = null
  isAuthAsync() {
    return this.promise
    .then(() => !!this.isAuth)
    .catch(() => !!this.isAuth)
  }

  init() {
    const token = cookie.load('authToken')
    if (token) {
      this.promise = this.login({token}).catch(err => {
        console.log('AuthStore.init', err);
        return {}
      })
    } else {
      this.promise = Promise.resolve()
    }
    if (__CLIENT__) {
      setTimeout(() => {
        VK.init({
          apiId: 5736656
        })
      }, 5000)
    }
    return {}
  }

  async signup(data) {
    this.promise = this.app.api.authSignup(data)
    const res = await this.promise
    await this.save(res)
  }

  async login(data) {
    this.promise = this.app.api.authLogin(data)
    const res = await this.promise
    await this.save(res)
  }

  async logout() {
    cookie.remove('authToken');
    this.app.api.setAuthToken(null)
    this.user = null
    this.token = null
    this.isAuth = null
    this.app.update()
  }

  async save(data) {
    cookie.save('authToken', data.token);
    this.app.api.setAuthToken(data.token)
    this.user = new User(data.user)
    this.token = data.token
    this.isAuth = true
    this.app.update()
  }

  async social(type) {
    if (type === 'vk') {
      const pack = await loginAuthVk()

      const email = pack.id + '@vk.com'
      const password = getHash(email)

      const data = { email, password }
      let res
      try {
        res = await this.signup({
          ...pack.user,
          ...data,
        })
      } catch (err) {
        console.log({err});
        res = await this.login(data)
      }
      return res
    }
    // if (type === 'facebook') {
    //   await loginAuthVk()
    // }
    // if (type === 'twitter') {
    //   await loginAuthVk()
    // }
    return null

  }
}
