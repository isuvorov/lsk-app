import { PropTypes, Component } from 'react'
import { inject, observer } from 'mobx-react'
import { autobind } from 'core-decorators'
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  InputGroup,
  HelpBlock
} from 'react-bootstrap'
import A from 'lsk-general/blocks/General/A'
import Slide from 'lsk-general/General/Slide'


// @inject("user")
// @observer
export default class LoginPage extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor() {
    super()
    this.state = {}
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;
    this.setState({
      status: 'wait',
    })
    this.props.user.login(this.getData())
    .then(() => {
      this.setState({
        status: 'ok',
      })
      this.context.history.push('/cabinet')
    })
    .catch(() => {
      this.setState({
        status: 'error',
      })
    })
  }
  render() {

    return <Slide
        full
        left='left'
        right='right'
        top='top'
        bottom='bottom'

        color='#ff644b'
        center
        style={{color: '#fff'}}
      >
        Content
      </Slide>
    return (
      <div>
        <div wrap title='Войти'>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              controlId="formBasicText"
              // validationState='success'
            >
              <InputGroup>
                <InputGroup.Addon>
                  {/* <Icons.email /> */}
                </InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Email"
                  value={this.state.login || ''}
                  // onChange={this.handleChangeField('login')}
                />
              </InputGroup>
              <FormControl.Feedback />
              {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              // validationState='success'
            >
              <InputGroup>
                <InputGroup.Addon>
                  {/* <Icons.lock /> */}
                </InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Пароль"
                  type='password'
                  value={this.state.password || ''}
                  // onChange={this.handleChangeField('password')}
                />
                {/* <HelpBlocsk>Validation is based on string length.</HelpBlock> */}
              </InputGroup>
              <FormControl.Feedback />
              {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
            </FormGroup>

            <Button bsStyle='primary' block type='submit'>
              <If condition={this.state.status === 'wait'}>
                {/* <Icons.loading /> */}
              </If>
              Войти
            </Button>
          </form>
          <br />
          <p className='text-center'>
            <A href='/auth/recovery' bsStyle='secondary'>
               Забыли пароль?
            </A>
          </p>
        </div>
        <br />
      </div>
    );
  }
}
