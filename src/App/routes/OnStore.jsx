import React, { Component, PropTypes } from 'react'
import { inject } from 'mobx-react'
import Preloader from '../components/Preloader'

@inject('user')
export default class OnStore extends Component { //eslint-disable-line
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    this.check()
  }
  componentWillReceiveProps() {
    this.check()
  }
  check() {
    console.log('check');
    this.component = this.props.check.bind(this)(this.props, this.context)
    this.setState({
      i: (this.state.i || 0) + 1,
    })
  }
  render() {
    // return <Preloader />
    return this.component || <Preloader />
  }
}
