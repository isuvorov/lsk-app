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
import AuthPage from '../AuthPage'
import Icons from '../../../components/Icons'
import Card from '../../../components/Card'
import A from '../../../components/A'
import SignupCard from '../../../components/SignupCard'

@inject("user")
@observer
export default class RecoveryPage extends AuthPage {
  @autobind
  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;
    this.setState({
      status: 'wait',
    })
    this.props.user.recovery(this.getData())
    .then(() => {
      this.setState({
        status: 'ok',
      })
    })
    .catch(() => {
      this.setState({
        status: 'error',
      })
    })
  }

  render() {
    return (
      <div>
        <Card wrap title='Восстановление пароля'>
          <If condition={this.state.status === 'ok'}>
            <p>
              Пароль от вашей учетной записи успешно сброшен, инструкции по восстановлению пароля отправлены вам на почту
            </p>
            <p className='text-center'>
              <A href='/auth/login' bsStyle='secondary'>
                 Войти
              </A>
            </p>
          </If>
          <If condition={this.state.status !== 'ok'}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup
                controlId="formBasicText"
                // validationState='success'
              >
                <InputGroup>
                  <InputGroup.Addon>
                    <Icons.email />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="Email"
                    value={this.state.login || ''}
                    onChange={this.handleChangeField('login')}
                  />
                </InputGroup>
                <FormControl.Feedback />
                {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
              </FormGroup>
              <Button bsStyle='primary' block type='submit'>
                <If condition={this.state.status === 'wait'}>
                  <Icons.loading />
                </If>
                Сбросить пароль
              </Button>
            </Form>
          </If>
        </Card>
        <br />
        <SignupCard />
      </div>
    );
  }
}
