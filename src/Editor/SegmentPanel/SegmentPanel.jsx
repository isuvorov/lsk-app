import { Table } from 'react-bootstrap'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'
import ControlEdit from '../SegmentForm/ControlEdit'
import ControlPush from '../SegmentForm/ControlPush'

export default class SegmentTable extends SegmentPrototype {
  render() {
    return <Table bordered striped rounded>
      {
        _.map(this.props.value, (value, key) => {
          const child = this.getChildProps(key)
          return <tr>
            <th>
              {child.title}
            </th>
            <td>
              <EditorBemjsonSegment
                {...child}
                // wrap={false}
                // value={value}
                // path={this.props.path}
                // dispatch={this.props.dispatch}
                // schema={this.props.schema}
              />
            </td>
            <td>
              <ControlEdit {...child} />
            </td>
          </tr>
        })
      }
      <tr>
        <td colSpan={3}>
          <ControlPush {...this.props} />
        </td>
      </tr>
    </Table>
  }
}
