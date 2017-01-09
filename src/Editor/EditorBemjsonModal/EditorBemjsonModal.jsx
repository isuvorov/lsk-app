import React, { Component, PropTypes } from 'react'
import { Modal, Button, Input, FormGroup, Radio } from 'react-bootstrap'
import { autobind } from 'core-decorators';

export default class EditorBemjsonModal extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    path: PropTypes.array,
    onChange: PropTypes.func,
  }

  getInitState(props) {
    return {
      showModal: false,
      // value: props.value,
      str: JSON.stringify(props.value),
      view: 'json',
      name: this.props.path[this.props.path.length - 1],
    }
  }

  constructor(props) {
    super(props)
    this.state = this.getInitState(props)
  }

  componentWillReceiveProps(props) {
    this.setState(this.getInitState(props));
  }

  @autobind
  saveAndClose() {
    const value = this.getValue()
    if (value === undefined) return false
    // JSON.parse(this.state.str)
    this.setState({ showModal: false }, () => {
      this.props.onChange(value)
    });
  }

  @autobind
  close() {
    this.setState({ showModal: false });
  }

  @autobind
  open() {
    this.setState({ showModal: true });
  }

  @autobind
  handleChange(e) {
    console.log('e.target.value', e.target.value);
    this.setState({
      str: e.target.value,
    })
  }

  getValue() {
    try {
      if (this.state.view === 'json') {
        return JSON.parse(this.state.str)
      } else if (this.state.view === 'js') {
        return eval(this.state.str)
      }
      return this.state.str
    } catch (e) {
      console.log(e);
      alert('INPUT ERROR')
      return undefined
    }
  }
  // stringify(value) {
  //   return JSON.stringify(value)
  // }
  //
  // parse(value) {
  //   return JSON.parse(value)
  // }

  handleChange(name) {
    return e => {
      console.log('handleChange', name, e.target.value, this);
      this.setState({
        [name]: e.target.value,
      })
    }
  }

  render() {
    return (<Button
      bsStyle={this.props.bsStyle || 'primary'}
      bsSize={this.props.bsSize || 'small'}
      onClick={this.open}
    >
        {this.props.children}
				<Modal show={this.state.showModal} onHide={this.close}>
	        <Modal.Header closeButton>
	          <Modal.Title>Редактирование {this.props.path.join('/')}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	          <If condition={this.props.changeName}>
	            <Input
                type="input"
                label="Name"
                onChange={this.handleChange('name')}
                value={this.state.name}
              	            />
              	          </If>
              	          <Input
                type="textarea"
                label="Value"
                onChange={this.handleChange('str')}
                value={this.state.str}
                rows={8}
	          />
	          <FormGroup onChange={this.handleChange('view')}>
	            <Radio name="view" value="string" checked={this.state.view === 'string'} inline>
	              String
	            </Radio>
	            {' '}
	            <Radio name="view" value="json" checked={this.state.view === 'json'} inline>
	              JSON
	            </Radio>
	            {' '}
	            <Radio name="view" value="js" checked={this.state.view === 'js'} inline>
	              JavaScript
	            </Radio>
	          </FormGroup>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button onClick={this.close}>Отменить</Button>
	          <Button onClick={this.saveAndClose} bsStyle="primary">Сохранить</Button>
	        </Modal.Footer>
	      </Modal>
      </Button>)
  }
}
