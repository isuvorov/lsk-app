import { PropTypes } from 'react'
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
import LoginCard from '../../../components/LoginCard'
import FormCard from '../../../components/ProfileCard/FormCard'

@inject("user")
@observer
export default class SignupPage extends FormCard {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;
    this.setState({
    status: 'wait',
    })
    this.props.user.signup(this.getData())
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
    const fields = [
      {
        icon: <Icons.profileInfo />,
        path: 'info.firstname',
        control: {
          placeholder: 'Имя',
        },
      },
      {
        // icon: <Icons.lock />,
        icon: <Icons.profileInfo />,
        path: 'info.lastname',
        control: {
          placeholder: 'Фамилия',
        },
      },
      {
        // icon: <Icons.lock />,
        icon: <Icons.email />,
        path: 'login',
        control: {
          placeholder: 'Почта',
        },
      },
      {
        // icon: <Icons.lock />,
        icon: <Icons.phone />,
        path: 'contacts.phone',
        control: {
          placeholder: 'Телефон',
        },
      },
      {
        icon: <Icons.lock />,
        path: 'password',
        control: {
          placeholder: 'Пароль',
          type: 'password',
        },
      },
    ]

    return (
      <div>
        <Card wrap title='Регистрация'>
          <form onSubmit={this.handleSubmit}>
            <For each="item" index="idx" of={fields}>
              <FormGroup
                controlId="formBasicText"
                // validationState='success'
              >
                <InputGroup>
                  <InputGroup.Addon>
                    {item.icon}
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    {...item.control}
                    value={this.getStatePath('data.' + item.path) || ''}
                    onChange={this.handleChangeField('data.' + item.path)}
                  />
                  {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
                </InputGroup>
                <FormControl.Feedback />
                {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
              </FormGroup>
            </For>

            <Button bsStyle='primary' block type='submit'>
              <If condition={this.state.status === 'wait'}>
                <Icons.loading />
              </If>
              Регистрация
            </Button>
          </form>
          <br />
          {/* <p className='text-center'>
            <A href='//www.dropbox.com/s/sgxjz41cuny07xu/confidential.pdf?dl=0' bsStyle='primary'>
               Политика конфеденциальности
            </A>
          </p> */}
        </Card>
        <br />
        <LoginCard />
      </div>
    );
  }
}
