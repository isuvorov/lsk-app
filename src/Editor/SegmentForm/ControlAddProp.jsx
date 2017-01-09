import { Component, PropTypes } from 'react'
import {
  Button,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'
import { autobind } from 'core-decorators';
import linkState from 'react-link-state'
import IconPlus from 'react-icons/lib/fa/plus'

import importcss from 'importcss'
@importcss(require('./ControlAddProp.css'))
export default class ControlAddProp extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.state = {
      key: '',
      value: '',
      type: 'string',
    }
  }
  @autobind
  handleClick() {
    this.props.onSubmit(this.state)
    this.setState({
      key: '',
      value: '',
    })
  }
  render() {
    return <div styleName='root'>
      <input
        placeholder="Key"
        bsSize="small"
        className="form-control"
        styleName='key'
        valueLink={linkState(this, 'key')}
      />
      <DropdownButton
        bsSize="small"
        className="creator-type"
        styleName="type"
        title="string"
        id="TypeChanger"
      >
        <MenuItem eventKey="1">string</MenuItem>
        <MenuItem eventKey="2">number</MenuItem>
        <MenuItem eventKey="3">date</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">object</MenuItem>
        <MenuItem eventKey="5">array</MenuItem>
      </DropdownButton>
      <Button
        bsStyle="primary"
        bsSize="small"
        className="creator-add"
        styleName="button"
        onClick={this.handleClick}
      >
        <IconPlus />
      </Button>
    </div>
  }
}
