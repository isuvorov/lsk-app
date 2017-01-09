import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import { autobind } from 'core-decorators';

export default class InputDebounce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
    }
    this.onChangeDebounced = _.debounce(this.props.onChange, this.props.debounce || 300)
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value,
    });
  }

  @autobind
  hangleChange(e) {
    this.setState({
      value: e.target.value,
    })
    this.onChangeDebounced(e.target.value)
  }

  render() {
    return <input
      {...this.props}
      value={this.state.value}
      onChange={this.hangleChange}
    />
  }
}
