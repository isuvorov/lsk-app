import SegmentPrototype from '../SegmentPrototype'
import InputDebounce from '../InputDebounce'
import { Label, DropdownButton, MenuItem } from 'react-bootstrap'

export default class SegmentSimple extends SegmentPrototype {
  render() {
    // console.log('render simple');
    const handleChange = value => {
      this.actionSetDebounced(value)
    }

    const type = typeof this.props.value === 'Number' ? 'number' : 'text'

    // <Label bsStyle='warning' style={{position: 'absolute', right: 5, top: 5,}}>
    //   {typeof this.props.value}
    // </Label>
    const controls = <DropdownButton
      bsSize="small"
      bsStyle="warning"
      title={type}
      id="TypeChanger"
      >
      <MenuItem eventKey="1">String</MenuItem>
      <MenuItem eventKey="2">Number</MenuItem>
      <MenuItem eventKey="3">Date</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Object</MenuItem>
      <MenuItem eventKey="5">Array</MenuItem>
    </DropdownButton>

    return <div style={{position:'relative'}}>
      <If condition={this.props.controls}>
        <span style={{position: 'absolute', right: 0, top: 0,}}>
          {controls}
        </span>
      </If>
      <InputDebounce
        type={type}
        className="form-control"
        ref="input"
        value={this.props.value}
        onChange={handleChange}
      />
    </div>
  }
}
