// EditorBemjson - redux store
//  EditorBemjsonRoot - save, wrapper
//  EditorBemjsonSegment - mapper name to compnents?
//
//
//    PanelWrapper
//
//    action -> value
//    action -> schema
//
//    schema -> format -> Body(Segment)
//    !schema -> defaultMapper -> superType() -> Body(Segment)
//
//
//    Array - format object
//    Array - format table
//    Array -
//    Object - format object
//    Object - format table
//    Object - custom format
//
//    ElementLayout
//      Controlls
//      Input(Segments)
//
//
//      ElementLayout0
//        .absolute
//          controlls
//        Segment
//          ControlLabel
//
//      ElementLayout1
//        FormGroup
//          ControlLabel
//      ElementLayout1a inline
//      ElementLayout2
//        tr
//          td key
//          td Segment
//          td controlls
//      ElementLayout3
//        panel
//          panel-header
//            title, Controlls
//          panel-body
//            Segment
//          panel-footer
//            controlls
//
//    ???
//     Contolls (Buttons)
//      props:
//        value
//        schema
//        path
//
//        parent
//
//        onChange
//        onUp
//        onDown
//        onPush
//        onRemove
//        onChangeFormat
//        onSchemaOneOf
//        ???? MODAL
//
//
//
//
//      Label
//      Dropdown - all
//      ButtonGroup + Dropdown
//
//     Input(?) Body(Segment, Format) - View Value
//      props:
//        value
//        path
//        schema
//        onChange
//
//      Prototype
//      SegmentNumber
//      SegmentTextarea
//
//      SegmentObject - ? Bootstrap Form
//      SegmentPanelObject - ? Panel for every props
//      SegmentTable - ?
//      SegmentImage- ?



import SegmentPrototype from '../SegmentPrototype'
// import InputDebounce from '../InputDebounce'

export default class SegmentNumber extends SegmentPrototype {
  render() {
    // const handleChange = value => {
    //   this.props.onChange(value)
    // }
    return <div>
      <input
        type='number'
        value={this.props.value}
      />
    </div>
  }
}
