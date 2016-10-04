import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import importcss from 'importcss'
// @observer
@importcss(require('./HomePage.css'))
export default class HomePage extends Component { //eslint-disable-line
  render() {
    return <div>
      <div styleName='logoWrapper section section_h_30'>
        <img src='/layout/logo_black.png' style={{width:200}} />
      </div>
      <div styleName='title section section_h_20'>
        Выездная конференция
      </div>
      <div styleName='subtitle section section_h_20'>
        БДО Юникон Бизнес Солюшнс
      </div>
      <div styleName='actionWrapper section section_h_20'>
        <div className='btn-group btn-group-justified' role='group' aria-label='...'>
          <div className='btn-group' role='group'>
            <a href='/maps' className='btn btn-lg btn-default'>Навигация</a>
          </div>
          <div className='btn-group' role='group'>
            <a href='/shedule' className='btn btn-lg btn-default'>Расписание</a>
          </div>
        </div>
      </div>
    </div>
  }
}
