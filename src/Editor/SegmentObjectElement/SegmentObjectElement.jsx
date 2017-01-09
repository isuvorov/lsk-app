import _ from 'lodash'
import {Component} from 'react'
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap'
import IconCode from 'react-icons/lib/fa/code'
import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import EditorBemjsonModal from '../EditorBemjsonModal'
import SegmentPrototype from '../SegmentPrototype'

// <SegmentObjectElement
//   title={title}
//   value={value}
//   path={path}
//   onChange={onChange}
//   onRemove={remove}
//   schema={schema}
// />

export default class SegmentObjectElement extends Component {
  render() {
    return <div className={`panel panel-default`}>
      <div className="panel-heading">
        <h3 className="panel-title">
          {this.props.title}
          {this.props.subTitle}
          <div className="panel-controls">
            <ButtonGroup bsSize="small">
              <If condition={this.props.onChange && this.props.path}>
                <EditorBemjsonModal
                  bsStyle="default"
                  onChange={this.props.onChange}
                  value={this.props.value}
                  path={this.props.path}
                  changeName
                >
                  <IconCode />
                </EditorBemjsonModal>
              </If>
              <DropdownButton
                bsSize="small"
                bsStyle="warning"
                title={this.props.title}
                id="TypeChanger"
              >
                <MenuItem eventKey="1">String</MenuItem>
                <MenuItem eventKey="2">Number</MenuItem>
                <MenuItem eventKey="3">Date</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Object</MenuItem>
                <MenuItem eventKey="5">Array</MenuItem>
              </DropdownButton>

              <If condition={this.props.push}>
                <Button bsSize="small" bsStyle="default" onClick={this.props.push}>
                  <IconPlus />
                </Button>
              </If>
              <If condition={this.props.up}>
                <Button bsStyle="default" onClick={this.props.up}>
                  <IconArrowUp />
                </Button>
              </If>
              <If condition={this.props.down}>
                <Button bsStyle="default" onClick={this.props.down}>
                  <IconArrowDown />
                </Button>
              </If>
              <If condition={this.props.onRemove}>
                <Button onClick={this.props.onRemove} bsStyle="danger" bsSize="small">
                  <IconClose />
                </Button>
              </If>
            </ButtonGroup>
          </div>
        </h3>
      </div>
      <div className="panel-body">
        {this.props.children}
      </div>
    </div>
  }
}
