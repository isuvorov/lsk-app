export default function dynamicRoutes(hostRoutes = {}) {
  return function action(params) {
    const { ctx, query } = params;
    const hostname =
      ctx.req && ctx.req.query && (ctx.req.query.hostname || ctx.req.query.domain || ctx.req.hostname) ||
      query && query.hostname ||
      __CLIENT__ && ( window.location.hostname );
    // console.log({hostname, ctx, query});
    const route = hostRoutes[hostname] || hostRoutes['*'];
    return route.action(params);
  };
}
