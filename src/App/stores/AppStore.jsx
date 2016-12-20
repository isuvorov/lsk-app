import { observable } from 'mobx';
import AuthStore from './AuthStore';
import ApiClient from '../api/api.client';
import config from '../../config/index.client'; // TODO fix

class AppStore {
  user = null;
  api = null;
  config = config;

  @observable updateCount = 0;
  update() {
    this.updateCount += 1
    console.log('this.updateCount', this.updateCount);
  }

  constructor(rootState, req) {
    this.api = new ApiClient({ base: '/api/v1' });
    this.auth = new AuthStore(this);
  }

  provide() {
    return {
      app: this,
      auth: this.auth,
      user: this.auth && this.auth.user,
      api: this.api,
    }
  }
}

export default AppStore;
