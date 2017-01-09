import _ from 'lodash'
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap'


import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'
import ControlEdit from '../SegmentForm/ControlEdit'
import ControlPush from '../SegmentForm/ControlPush'



import importcss from 'importcss'
@importcss(require('./SegmentForm.css'))
export default class SegmentForm extends SegmentPrototype {

  render() {
    // console.log('render SegmentForm');
    return <div styleName="root">
      {
        _.map(this.props.value, (value, key) => {
          const child = this.getChild(key)
          const type = this.getValueType(key)
          if (child.isComplexType()) {
            return <div
              className={"panel " + (type === 'array' ? 'panel-warning' : 'panel-default')}
              styleName={`panel panel_type_${type}`}
            >
              <h3 className="panel-heading" styleName="heading">
                <span styleName="title">
                  {child.getTitle()}
                </span>
                <span styleName="controlEdit">
                  <ControlEdit {...child.props} bsSize='small' />
                </span>
              </h3>
              <div
                key={key}
                className="panel-body"
                styleName="body"
                style={{
                  display: false ? 'none' : 'block',
                }}
              >
                <p styleName="description">
                  {child.getDescription()}
                </p>
                <EditorBemjsonSegment
                  {...child.props}
                />
              </div>
              <div className="panel-footer" >
                <ControlPush {...child.props} />
              </div>
            </div>
          }


          return <FormGroup
            controlId="formBasicText"
            // validationState='error'
          >
            <ControlLabel style={{width:'100%'}}>
              <div>
                <span>
                  {child.getTitle()}
                </span>
                <span style={{float:'right'}}>
                  <ControlEdit {...child.props} />
                </span>
              </div>
            </ControlLabel>
            <EditorBemjsonSegment
              {...child.props}
            />
            <FormControl.Feedback />
            <HelpBlock>{child.getDescription()}</HelpBlock>
          </FormGroup>
        })
      }
    </div>
  }
}
