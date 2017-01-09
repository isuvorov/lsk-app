import React, { Component, PropTypes } from 'react'

import EditorBemjsonRoot from '../EditorBemjsonRoot'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from '../reducer';


export default class EditorBemjson extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducer, {value: props.value, schema: props.schema})
    this.unsubscribe = this.store.subscribe(() => {
      this.props.onChange && this.props.onChange(this.store.getState().value)
    })
  }

  componentWillReceiveProps(props) {
    if (JSON.stringify(this.props) === JSON.stringify(props)) return null
    this.store.dispatch({
      type: 'init',
      value: props.value,
      schema: props.schema
    })
  }

  render() {
    return <Provider store={this.store}>
      <EditorBemjsonRoot onSubmit={this.props.onSubmit}  />
    </Provider>
  }
}
