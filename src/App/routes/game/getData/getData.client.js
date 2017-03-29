export default ({uapp}) => {
  console.log({uapp}, window.__ROOT_STATE__);
  if (!uapp.rootState) uapp.rootState = window.__ROOT_STATE__ || {}
  return uapp.rootState.pageData
}
