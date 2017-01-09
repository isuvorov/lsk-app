import SegmentPrototype from '../SegmentPrototype'
import TextareaDebounce from '../InputDebounce/TextareaDebounce'

export default class SegmentTextarea extends SegmentPrototype {
  render() {
    const handleChange = value => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.props.path,
        value,
      });
    }
    const schema = this.props.schema || {}
    const rows = schema.options && schema.options.rows || 7
    return <div>
      <TextareaDebounce
        type="textarea"
        className="form-control"
        ref="input"
        rows={rows}
        value={this.props.value}
        onChange={handleChange}
      />
    </div>
  }
}
