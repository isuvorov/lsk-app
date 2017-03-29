import React, { Component } from 'react'
import Page from 'lsk-general/General/Page'
import Slide from 'lsk-general/General/Slide'
import Slides from 'lsk-general/General/Slides'
import InnerHtml from 'lsk-general/General/InnerHtml'
import importcss from 'importcss'

// class SomePage

// import Page from 'lsk-general/General/Page'
@importcss(require('./NotePage.css'))
export default class NotePage extends Page {
  render() {

    return <Slides>
      <Slide
        height='20vh'
        overlay
        image='https://d1ujcb8mxkwm85.cloudfront.net/assets/live-banner-70e4b120e3b4312b2c14f3a5971f524097d35203c7e1228676254cda442c3ed3.jpg'
        styleName='headerSlide'
      >

        <img styleName='avatar' src='https://pp.userapi.com/c630220/v630220029/cf5b/XN912Re_pdg.jpg' />
        <h1 styleName='title'>
          Игорь Суворов
        </h1>
        <h2 styleName='subtitle'>
          Программист, предприниматель и ...блоггер?!!
        </h2>
      </Slide>
      <Slide
        fixed
      >
        <InnerHtml content={this.props.note} type='md' />
      </Slide>
    </Slides>
  }
}
