var fetch = require('node-fetch')
var url = 'https://api.foursquare.com/v2/venues/search?client_id=GVXLP5ATUI2VAMBIYRBA15QWCTFKS2FD3Q4JU02DPHIZTW51&client_secret=0REDFUUZJCM2DKHEJOCGMKXNXAQSANMBXPBLVS24QPUZSKXR&ll=53.5115795,49.2634181&v=20160827&query=бизнес'
url = encodeURI(url)
fetch(url, {method:'get'}).then(function(response){
  console.log(response);
  response.json().then(function(data){
    console.log(data)
    data.response.venues.map(function(venue){
      console.log(venue.name)
    })
  })
})
