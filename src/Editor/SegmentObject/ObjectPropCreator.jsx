import { Component, PropTypes } from 'react'
import { Row, Col, Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap'
import { autobind } from 'core-decorators';

import linkState from 'react-link-state'
import IconPlus from 'react-icons/lib/fa/plus'

import importcss from 'importcss'
@importcss(require('./style.css'))
export default class ObjectPropCreator extends Component {
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
    return <div>
        <input valueLink={linkState(this, 'key')} placeholder="Key" bsSize="small" className="form-control creator-key" />
        <div>
          <DropdownButton
            bsSize="small"
            className="creator-type"
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
          <Button onClick={this.handleClick} bsStyle="primary" bsSize="small" className="creator-add">
  	        <IconPlus />
  	      </Button>
        </div>
      </div>

        {/*<input valueLink={linkState(this, 'value')}  placeholder="Value"  bsSize="small" className="form-control creator-value" />
				<input valueLink={linkState(this, 'type')} placeholder="Type" bsSize="small" className="form-control creator-type" />

      </div>*/}
  }
}
