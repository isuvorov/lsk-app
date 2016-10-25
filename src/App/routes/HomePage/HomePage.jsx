import React, { Component } from 'react'
// import { inject, observer } from 'mobx-react'
import importcss from 'importcss'
// @observer
@importcss(require('./HomePage.css'))
export default class HomePage extends Component { //eslint-disable-line
  render() {
    return <div>
      HomePage

    </div>
  }
}
