import { Button, ButtonGroup, PanelGroup, Panel, Table } from 'react-bootstrap'
import _ from 'lodash'
import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'
import SegmentObjectElement from '../SegmentObjectElement'

export default class SegmentArrayTable extends SegmentPrototype {

  renderAsTable() {
    return <Table bordered striped rounded>
      <For each="value" index="index" of={ this.props.value }>
        <tr>
          <th>
            {index}
            {/*{this.renderTitle()}*/}
          </th>
          <td>
            <EditorBemjsonSegment
              wrap={false}
              value={value}
              path={this.props.path}
              dispatch={this.props.dispatch}
              schema={this.props.schema}
            />
            {/*{this.renderBody()}*/}
          </td>
          <td>
            {/*{this.renderControls()}*/}
            <button onClick={this.props.actionDownByKey(key)}>
              down
            </button>
            <button onClick={this.props.actionUpByKey(key)}>
              up
            </button>
            <button onClick={this.props.actionRemoveByKey(key)}>
              x
            </button>
          </td>
        </tr>
      </For>
    </Table>

  }

}
