import _ from 'lodash';
export default {
  universalActions: ['now'],
  // universalTypes: {now: Date}
  now() {
    return new Date();
  },

};
