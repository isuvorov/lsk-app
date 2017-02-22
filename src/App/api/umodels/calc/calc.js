import _ from 'lodash';
export default {
  universalActions: ['sum'],
  sum(...args) {
    return _.sum(args);
  },
};
