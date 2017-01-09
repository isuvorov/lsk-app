import { FormControl } from 'react-bootstrap'
import InputDebounce from './InputDebounce'

export default class TextareaDebounce extends InputDebounce {
  render() {
    return <FormControl
      componentClass='textarea'
      {...this.props}
      value={this.state.value}
      onChange={this.hangleChange}
    />
  }
}
