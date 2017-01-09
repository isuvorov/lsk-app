import SegmentPrototype from '../SegmentPrototype'
import SegmentArray from '../SegmentArray'
import SegmentObject from '../SegmentObject'
import SegmentObjectPanels from '../SegmentObject'
import SegmentSimple from '../SegmentSimple'
import SegmentTextarea from '../SegmentTextarea'
import SegmentNumber from '../SegmentNumber'
import SegmentArrayPanels from '../SegmentArray'
import SegmentObjectElement from '../SegmentObjectElement'
import SegmentForm from '../SegmentForm'

export default class EditorBemjsonSegment extends SegmentPrototype {

  getRenderComponent() {
    const supertype = this.getSuperType()

    switch (this.getFormat()) {
      case 'textarea':
        return SegmentTextarea
      case 'number':
        return SegmentNumber
      default:
        break
    }

    switch (this.getSuperType()) {
      case 'array':
        return SegmentForm
      case 'object':
        return SegmentForm
      case 'simple':
      default:
        return SegmentSimple
    }
  }

  render() {
    const Class = this.getRenderComponent()
    return <Class {...this.props} />
  }
}
