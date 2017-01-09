import React, { Component, PropTypes } from 'react'
import { Row, Col, Table, Modal, Button, Input } from 'react-bootstrap'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import ControlEdit from '../SegmentForm/ControlEdit'
import SegmentForm from '../SegmentForm'
import SegmentPrototype from '../SegmentPrototype'

import { autobind } from 'core-decorators';
import { connect } from 'react-redux'


export class EditorBemjsonRoot extends Component {

  // @autobind
  // handleClickSave() {
  //   this.props.onSubmit && this.props.onSubmit(this.props.value)
  // }

  render() {
    const key = '#'
    const value = {
      '#': this.props.value,
    }
    const schema = {
      type: 'object',
      properties: {
        '#': this.props.schema
      }
    }
    // if (this.props.schema) {
    //   value['@'] = this.props.schema
    // }
    const child = {
      ...this.props,
      schema: schema,
      rootSchema: schema,
      value,
      path: [],
    }
    return <EditorBemjsonSegment
      {...child}
    />
    //
    // return <SegmentForm
    //   child
    // />
    //
    // return <div className="panel panel-primary" styleName="panel">
    //   <h3 className="panel-heading" styleName="heading">
    //       <span styleName="title">
    //         {child.title}
    //       </span>
    //       <span styleName="controlEdit">
    //         <ControlEdit {...child} bsSize='small' />
    //       </span>
    //   </h3>
    //   <div
    //     key={key}
    //     className="panel-body"
    //     styleName="body"
    //     style={{
    //       display: false ? 'none' : 'block',
    //     }}
    //   >
    //     <EditorBemjsonSegment
    //       {...child}
    //     />
    //   </div>
    // </div>
    //
    // return <div>
    //
    //
    //   <h1>Editor</h1>
    //   [controls]
    //   <EditorBemjsonSegment
    //     value={this.props.value}
    //     schema={this.props.schema}
    //     dispatch={this.props.dispatch}
    //   />
    //   <Button onClick={this.handleClickSave} bsStyle='success'>
    //       Сохранить
    //   </Button>
    // </div>
  }
}

export default connect(
  state => ({
    // state,
    value: state.value,
    schema: state.schema,
  }),
  dispatch => ({
    dispatch,
  })
)(EditorBemjsonRoot)
