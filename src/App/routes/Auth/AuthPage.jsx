import { Component } from 'react'
import { autobind } from 'core-decorators'

export default class AuthPage extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  @autobind
  validate() {
    return true
  }

  @autobind
  getData() {
    return this.state
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;
    this.props.user.login(this.getData())
  }

  handleChangeField(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value,
      })
    }
  }
}
