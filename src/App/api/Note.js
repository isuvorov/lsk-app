import Promise from 'bluebird'

export default {
  get: (path) => {
    const base = 'https://raw.githubusercontent.com/isuvorov/notes/master'
    const urls = [
      `${base}${path}.md`,
      `${base}${path}/index.md`,
      `${base}${path}/README.md`,
    ]
    function mapper(url) {
      let i = 3;
      function tryFetch(url) {
        return fetch(url).then(res => res.text()).then(text => {
          if (text.substr(0, 3) === '404') throw new Error(text)
          if (text.substr(0, 3) === '400') throw new Error(text)
          // if (text.substr(0, 3) === '400') {
          //   console.log(400, i);
          //   if (i-- <= 0) throw new Error(text)
          //   return Promise.deplay(1000).then(() => tryFetch(url))
          // }
          return text
        })
      }
      return tryFetch(url);


    }
    return Promise.any(urls.map(mapper))
  }
}
