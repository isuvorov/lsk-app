export default (...args) => ({
  // Schema: require('./Schema').default,
  // Model: require('./Model').default,
  // date: require('./date').default(...args),
  // calc: require('./calc').default(...args),
  task: require('./task').default(...args),
  Game: require('./Game').default(...args),
});
