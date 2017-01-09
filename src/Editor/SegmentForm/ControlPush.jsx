import {
  Button,
} from 'react-bootstrap'
import IconPlus from 'react-icons/lib/fa/plus'
import SegmentPrototype from '../SegmentPrototype'
import ControlAddProp from './ControlAddProp'

export default class ControlPush extends SegmentPrototype {

  render() {
    return <div>
      <If condition={this.getValueType() === 'object'}>
        <ControlAddProp onSubmit={this.actionAddProp} />
      </If>
      <If condition={this.getValueType() === 'array'}>
        <Button onClick={this.actionPush} block>
          <IconPlus /> Добавить элемент
        </Button>
      </If>
    </div>
  }
}
