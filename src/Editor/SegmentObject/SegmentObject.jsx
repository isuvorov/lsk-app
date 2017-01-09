import _ from 'lodash'
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap'
import IconCode from 'react-icons/lib/fa/code'
import IconClose from 'react-icons/lib/fa/close'
import IconDown from 'react-icons/lib/fa/arrow-down'
import IconPlus from 'react-icons/lib/fa/plus'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import EditorBemjsonModal from '../EditorBemjsonModal'
import SegmentPrototype from '../SegmentPrototype'
import SegmentObjectElement from '../SegmentObjectElement'
import ObjectPropCreator from './ObjectPropCreator'

import importcss from 'importcss'
@importcss(require('./style.css'))
export default class SegmentObject extends SegmentPrototype {

  wrapChild(child, key) {
    return child
    const value = this.props.value[key]
    return <SegmentObjectElement
      title={key}
      //value={value}
      //path={path}
      //onChange={onChange}
      //onRemove={remove}
      //dispatch={this.props.dispatch}
      schema={this.props.schema}
    >
      {child}
    </SegmentObjectElement>
  }

  render() {
    console.log('render');
    const path = this.getPath();
    const value = this.props.value;
    const onChange = (value) => {
      this.props.dispatch({
        type: 'editorSet',
        path,
        value,
      });
    }

    // return (
    //   <div key={key}>
    //     <label className=" control-label">
    //       {key}
    //       &nbsp;


    const childs = _.map(this.props.value, (value, key) => {
      const path = this.getPath(key);
      const schema = this.getSchema(key);

      const remove = () => {
        this.props.dispatch({
          type: 'editorRemove',
          path,
        });
      }

      return this.wrapChild(
        <EditorBemjsonSegment
          value={value}
          path={path}
          dispatch={this.props.dispatch}
          schema={schema}
        />,
        {key, value}
      )

      // change in modal
      const onChange = (value) => {
        // console.log('onChange', value);
        this.props.dispatch({
          type: 'editorSet',
          path,
          value,
        });
      }
      const ifArray = this.getSuperType(value) === 'array'
      const panelStyle = ifArray ? 'panel-info' : 'panel-default'
      return (
        // <SegmentObjectElement
        //   title={key}
        //   value={value}
        //   path={path}
        //   onChange={onChange}
        //   onRemove={remove}
        //   //dispatch={this.props.dispatch}
        //   schema={schema}
        // >
          <EditorBemjsonSegment
            styleName="panel-body"
            value={value}
            path={path}
            dispatch={this.props.dispatch}
            schema={schema}
          />
        // </SegmentObjectElement>
        // <div className={`panel ${panelStyle}`}>
        //   <div className="panel-heading">
        //     <h3 className="panel-title">
        //       {key}
        //       <div className="panel-controls">
        //         <ButtonGroup bsSize="small">
        //           <EditorBemjsonModal
        //             bsStyle="default"
        //             onChange={onChange}
        //             value={value}
        //             path={path}
        //             changeName
        //           >
        //             <IconCode />
        //           </EditorBemjsonModal>
        //           <DropdownButton
        //             bsSize="small"
        //             bsStyle="warning"
        //             title={this.getSuperType(value)}
        //             id="TypeChanger"
        //           >
        //             <MenuItem eventKey="1">String</MenuItem>
        //             <MenuItem eventKey="2">Number</MenuItem>
        //             <MenuItem eventKey="3">Date</MenuItem>
        //             <MenuItem divider />
        //             <MenuItem eventKey="4">Object</MenuItem>
        //             <MenuItem eventKey="5">Array</MenuItem>
        //           </DropdownButton>
        //           <Button onClick={remove} bsStyle="danger" bsSize="small">
        //             <IconClose />
        //           </Button>
        //         </ButtonGroup>
        //       </div>
        //     </h3>
        //   </div>
        //   <div className="panel-body">
        //     <EditorBemjsonSegment
        //       styleName="panel-body"
        //       value={value}
        //       path={path}
        //       dispatch={this.props.dispatch}
        //       schema={schema}
        //     />
        //   </div>
        // </div>
      );
    })

    const push = (state) => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(state.key),
        value: state.value,
      });
    }

    return <div styleName2="obj-content">
      {/*<h3>
        Object
				<ButtonGroup bsSize="small">
					<Button bsStyle="default">
						<IconDown />
					</Button>
					<Button bsSize="small" bsStyle="default">
						<IconPlus />
					</Button>
					<EditorBemjsonModal bsStyle="default" onChange={onChange} value={value} path={path}>
	          <IconCode />
	        </EditorBemjsonModal>
			  </ButtonGroup>
      </h3>*/}
      {childs}
			<hr />
			<div className="obj-creator">
				<ObjectPropCreator onSubmit={push} />
			</div>
    </div>


  }
}
