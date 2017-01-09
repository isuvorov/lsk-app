import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
  Label,
} from 'react-bootstrap'
import IconCode from 'react-icons/lib/fa/code'
import IconDown from 'react-icons/lib/fa/arrow-down'
import IconUp from 'react-icons/lib/fa/arrow-up'
import IconPlus from 'react-icons/lib/fa/plus'
import IconClose from 'react-icons/lib/fa/close'

import EditorBemjsonModal from '../EditorBemjsonModal'
import SegmentPrototype from '../SegmentPrototype'

export default class ControlEdit extends SegmentPrototype {
  render() {
    const child = this.props
    const bsSize = this.props.bsSize || 'xsmall'
    const key = child.path[child.path.length - 1]

    return <ButtonGroup bsSize={bsSize}>
      <Button bsStyle='primary'>
        {this.getFormat()}
        {/* <Label bsStyle="warning">!{this.getFormat()}</Label> */}
      </Button>
      <If condition={this.isComplexType()}>
        <EditorBemjsonModal
          bsStyle="info"
          bsSize={bsSize}
          bsSize="xsmall"
          {...child}
          onChange={this.actionSet}
        >
          <IconCode />
        </EditorBemjsonModal>
      </If>

      <If condition={this.getParentValueType() === 'array'}>
        <Button
          bsStyle="default"
          bsSize={bsSize}
          onClick={this.actionUp}
          disabled={key === 0}
        >
          {child.key}
          <IconUp />
        </Button>
        <Button
          bsStyle="default"
          bsSize={bsSize}
          onClick={this.actionDown}
          disabled={key=== this.props.parentLength - 1}
        >
          <IconDown />
        </Button>
      </If>


      {/* <If condition={actions.actionAddProp}>
        <Button bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={actions.actionAddProp}>
          <IconPlus />
        </Button>
      </If>
      <If condition={actions.actionPush}>
        <Button bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={actions.actionPush}>
          <IconPlus />
        </Button>
      </If> */}
      {/* <If condition={specialActions.actionRemove}>
        <Button bsStyle="danger" bsSize={bsSize} onClick={specialActions.actionRemove}>
          <IconClose />
        </Button>
      </If> */}
      <DropdownButton
        bsSize={bsSize}
        bsStyle="warning"
        id="TypeChanger"
      >
        {/* <MenuItem eventKey="1">String</MenuItem>
        <MenuItem eventKey="2">Number</MenuItem>
        <MenuItem eventKey="3">Date</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Object</MenuItem>
        <MenuItem eventKey="5">Array</MenuItem> */}
        <If condition={this.getParentValueType() === 'object'}>
          <MenuItem bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={this.actionAddProp}>
            <IconPlus /> Добавить свойство
          </MenuItem>
        </If>
        <If condition={this.getParentValueType() === 'array'}>
          <MenuItem bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={this.actionPush}>
            <IconPlus />Добавить элемент
          </MenuItem>
        </If>
        <EditorBemjsonModal
          bsStyle="info"
          bsSize={bsSize}
          bsSize="xsmall"
          {...child}
          onChange={this.actionSet}
        >
          <IconCode /> Изменить
        </EditorBemjsonModal>
        <MenuItem divider />
        <If condition={this.getParentValueType() === 'array'}>
          <MenuItem
            bsStyle="default"
            bsSize={bsSize}
            onClick={this.actionUp}
            disabled={key === 0}
          >
            {child.key}
            <IconUp /> Передвинуть выше
          </MenuItem>
          <MenuItem
            bsStyle="default"
            bsSize={bsSize}
            onClick={this.actionDown}
            disabled={key === this.props.parentLength - 1}
          >
            <IconDown /> Передвинуть ниже
          </MenuItem>
        </If>
        <MenuItem divider />

        <If condition={!this.isHashRoot() && (this.getParentValueType() === 'array' || this.getParentValueType() === 'object')}>
          <MenuItem bsStyle="danger" bsSize={bsSize} onClick={this.actionRemove}>
            <IconClose /> Удалить
          </MenuItem>
        </If>
      </DropdownButton>
    </ButtonGroup>
  }
}
