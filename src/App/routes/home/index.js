import dynamicRoutes from '../dynamicRoutes';

export default {
  path: '/',
  action: dynamicRoutes({
    'abb.quizly.ru': require('./abb').default,
    'cbsd.quizly.ru': require('./cbsd').default,
    'cbsd.quizly.x.mgbeta.ru': require('./cbsd').default,
    'lico.quizly.ru': require('./lico').default,
    'lico.quizly.x.mgbeta.ru': require('./lico').default,
    'momentum.ru': require('./momentum').default,
    'quizard.ru': require('./quizard').default,
    'quizly.ru': require('./quizly').default,
    '*': require('./lico').default,
    // '*': require('./cbsd').default,
    // '*': require('./quizard').default,
  }),
};
//
