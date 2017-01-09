import { Button, ButtonGroup, PanelGroup, Panel, Table } from 'react-bootstrap'
import _ from 'lodash'
import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'
import SegmentObjectElement from '../SegmentObjectElement'

export default class SegmentArray extends SegmentPrototype {
  constructor() {
    super()
    this.state = {
      collapsed: [],
    }
    this.changeCollapse = this.changeCollapse.bind(this);
  }
  componentWillMount() {
    this.genArr()
  }
  genArr = () => {
    let { collapsed } = this.state
    collapsed = _.range(this.props.value.length).map(() => true)
    this.setState({ collapsed })
  }
  changeCollapse(key) {
    return () => {
      console.log('changeCollapse', this);
      const collapsed = _.clone(this.state.collapsed)
      collapsed[key] = !collapsed[key]
      this.setState({ collapsed })
    }
  }

  render() {
    return this.renderAsObject()
    return this.renderAsTable()
  }
  renderAsTable() {
    // const childs = _.map(this.props.value, (value, key) => {
    //   return <div className="panel panel-default">
    //     <div className="panel-heading">
    //       <h3 className="panel-title">
    //         <Button
    //           bsStyle="link"
    //           onClick={this.changeCollapse(key)}
    //         >{`Object ${key}`}</Button>
    //         <div className="panel-controls">
    //           <ButtonGroup styleName="btn-group" bsSize="small">
    //             <Button bsStyle="default" onClick={up} disabled={key === 0}>
    //               <IconArrowUp />
    //             </Button>
    //             <Button bsStyle="default" onClick={down} disabled={key === last}>
    //               <IconArrowDown />
    //             </Button>
    //             <Button bsStyle="danger" onClick={remove}>
    //               <IconClose />
    //             </Button>
    //           </ButtonGroup>
    //         </div>
    //       </h3>
    //     </div>
    //     <div
    //       key={key}
    //       className="panel-body"
    //       style={{
    //         display: this.state.collapsed[key] ? 'none' : 'block',
    //       }}
    //     >
    //       <EditorBemjsonSegment
    //         value={value}
    //         path={path}
    //         dispatch={this.props.dispatch}
    //         schema={schema}
    //       />
    //     </div>
    //   </div>
    // });
    //
    // const schema = this.getSchema(0)
    // const push = () => {
    //   console.log('push');
    //   // const value = {}
    //   this.props.dispatch({
    //     type: 'editorSet',
    //     path: this.getPath(this.props.value.length),
    //     value: this.getSample(schema),
    //     // value: this.getSample(this.props.value.length),
    //   });
    // }

    return <Table bordered striped rounded>
      <For each="value" index="index" of={ this.props.value }>
        <tr>
          <th>
            {index}
          </th>
          <td>
            <EditorBemjsonSegment
              wrap={false}
              value={value}
              path={this.props.path}
              dispatch={this.props.dispatch}
              schema={this.props.schema}
            />
          </td>
        </tr>
      </For>
    </Table>
    return <div>
    {JSON.stringify(this.state)}

    <SegmentObjectElement title='Array'>
      {JSON.stringify(this.state)}
      {childs}
      <Button onClick={push} block>
        <IconPlus /> Добавить элемент
      </Button>
    </SegmentObjectElement>
    </div>
  }

  renderAsObject() {
    const last = this.props.value.length - 1;
    const childs = _.map(this.props.value, (value, key) => {
      const path = this.getPath(key);
      const schema = this.getSchema(key);
      const up = () => {
        this.props.dispatch({
          type: 'editorSwap',
          path,
          pathTo: this.getPath(key - 1),
        });
      }

      const down = () => {
        this.props.dispatch({
          type: 'editorSwap',
          path,
          pathTo: this.getPath(key + 1),
        });
      }

      const remove = () => {
        this.props.dispatch({
          type: 'editorRemoveElement',
          path: this.props.path,
          index: key,
        });
      }
      return <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <Button
              bsStyle="link"
              onClick={this.changeCollapse(key)}
            >{`Object ${key}`}</Button>
            <div className="panel-controls">
              <ButtonGroup styleName="btn-group" bsSize="small">
                <Button bsStyle="default" onClick={up} disabled={key === 0}>
                  <IconArrowUp />
                </Button>
                <Button bsStyle="default" onClick={down} disabled={key === last}>
                  <IconArrowDown />
                </Button>
                <Button bsStyle="danger" onClick={remove}>
                  <IconClose />
                </Button>
              </ButtonGroup>
            </div>
          </h3>
        </div>
        <div
          key={key}
          className="panel-body"
          style={{
            display: this.state.collapsed[key] ? 'none' : 'block',
          }}
        >
          <EditorBemjsonSegment
            value={value}
            path={path}
            dispatch={this.props.dispatch}
            schema={schema}
          />
        </div>
      </div>
    });

    const schema = this.getSchema(0)
    const push = () => {
      console.log('push');
      // const value = {}
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(this.props.value.length),
        value: this.getSample(schema),
        // value: this.getSample(this.props.value.length),
      });
    }

    return <div>
    {/*{JSON.stringify(this.state)}*/}

    <SegmentObjectElement title='Array'>
      {/*{JSON.stringify(this.state)}*/}
      {childs}
      <Button onClick={push} block>
        <IconPlus /> Добавить элемент
      </Button>
    </SegmentObjectElement>
    </div>
  }
}
