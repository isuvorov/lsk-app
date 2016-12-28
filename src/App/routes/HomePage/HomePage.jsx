import React, { Component } from 'react'
import Slide from 'lsk-general/General/Slide'
import Slides from 'lsk-general/General/Slides'
import Page from 'lsk-general/General/Page'

require('./some.global.css')
import importcss from 'importcss'
@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  render() {
    return <Page>
      <Slides>
        <Slide
          full
          fixed
          video='http://skill-branch.ru/video-background.webm'
        >
          <h1>
            Получай образование и строй карьеру в профессиональном IT-сообществе
          </h1>
        </Slide>
        <Slide
          full
          // image='https://pp.vk.me/c636819/v636819936/346c3/6xIvJ0BI8rs.jpg'
          // video='https://youtu.be/C8PYHjRj-zk'
          // video='https://www.youtube.com/embed/C8PYHjRj-zk'
          video='http://skill-branch.ru/video-background.webm'
        >
          <h1>
            Получай образование и строй карьеру в профессиональном IT-сообществе
          </h1>
        </Slide>
        <Slide
          full
          // image='https://pp.vk.me/c636819/v636819936/346c3/6xIvJ0BI8rs.jpg'
          // video='https://youtu.be/C8PYHjRj-zk'
          // video='https://www.youtube.com/embed/C8PYHjRj-zk'
          video='http://skill-branch.ru/video-background.webm'
        >
          <h1>
            Получай образование и строй карьеру в профессиональном IT-сообществе
          </h1>
        </Slide>
      </Slides>
    </Page>
  }
}
