import { Button, ButtonGroup, PanelGroup, Panel, Table } from 'react-bootstrap'
import _ from 'lodash'
import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'
import SegmentObjectElement from '../SegmentObjectElement'

export default class SegmentArrayPanel extends SegmentPrototype {

  getChildProps(key) {
    const value = this.props.value[key]

    return {
      wrap:false,
      value: value,
      path: this.props.path,
      dispatch: this.props.dispatch,
      schema: this.props.schema,
    }

  }
  renderAsTable() {
    return <div bordered striped rounded>
      <For each="value" index="key" of={this.props.value}>
        <Panel>
          <Panel.Header>
            {key}
            <Panel.Controls>
              <button onClick={this.props.actionDownByKey(key)}>
                down
              </button>
              <button onClick={this.props.actionUpByKey(key)}>
                up
              </button>
              <button onClick={this.props.actionRemoveByKey(key)}>
                x
              </button>
            </Panel.Controls>
          </Panel.Header>
          <Panel.Body>
            <EditorBemjsonSegment {...this.getChildProps(key)}/>
          </Panel.Body>
        </Panel>
      </For>
      <button onClick={this.props.onPush}>
        +
      </button>
    </div>
  }
}


// SegmentArrayPanel.Body = class
