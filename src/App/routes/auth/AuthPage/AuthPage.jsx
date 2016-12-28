import { PropTypes, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import importcss from 'importcss';
import {
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  InputGroup,
  HelpBlock
} from 'react-bootstrap';

import A from 'lsk-general/General/A';
import Link from 'lsk-general/General/Link';
import Slide from 'lsk-general/General/Slide';
import Form from 'lsk-general/General/Form';
import Card from 'lsk-general/General/Card';
import Page from 'lsk-general/General/Page';
// import Page from '~/General/Page';

import IconVk from 'react-icons/lib/mdi/vk';
import IconFacebook from 'react-icons/lib/mdi/facebook';
import IconTwitter from 'react-icons/lib/mdi/twitter';


// @inject("user")
// @observer
@importcss(require('./AuthPage.css'))
export default class LoginPage extends Form {

  // @autobind
  // handleSubmit(e) {
  //   e.preventDefault();
  //   if (!this.validate()) return;
  //   this.setState({
  //     status: 'wait',
  //   })
  //   this.props.auth.login(this.getData())
  //   .then(() => {
  //     this.setState({
  //       status: 'ok',
  //     })
  //     this.redirect('/cabinet')
  //   })
  //   .catch(() => {
  //     this.setState({
  //       status: 'error',
  //     })
  //   })
  // }
  //
  getFields() {
    return [
      {
        path: 'login',
        control: {
          type: 'email',
        }
      },
      {
        path: 'password',
        control: {
          type: 'email',
        }
      },
    ]
    // const fields = this.props.task.fields || {}
    // // this.props.task.getFields()
    // return _.map(fields, (title, name) => {
    //   return {
    //      icon: <Icons.link />,
    //      path: name,
    //      control: {
    //        placeholder: title,
    //      },
    //   }
    // }).filter(c => c.path[0] !== '_')
  }
  render() {

    const socials = [
      {
        name: 'vk',
        icon: <IconVk />,
      },
      {
        name: 'facebook',
        icon: <IconFacebook />,
      },
      {
        name: 'twitter',
        icon: <IconTwitter />,
      },
    ];


    return <Page theme='dark'>
        <Slide
        full
        // color='#ff644b'
        color='#333'
        overlay
        image='//drscdn.500px.org/photo/152119591/m%3D2048/1c0a013e2a1db72aa8ad8517924c0898'
        center
      >
        <form onSubmit={this.handleSubmit} styleName='form'>
          <img styleName='logo' src={require('../batman.png')} />
          <br />
          <Card wrap title='Войти в кабинет'>
            {this.renderFields(this.getFields())}
            <br />
            <Button bsStyle='primary' block type='submit'>
              <If condition={this.state.status === 'wait'}>
                Loader
              </If>
              Войти
            </Button>
            <div styleName='links'>
              <div styleName='link'>
                <a href='#'>Регистрация</a>
              </div>
              <div styleName='link'>
                <a href='#'>Восстановить пароль</a>
              </div>
            </div>
          </Card>
          {/* <br />
          <p className='text-center'>
            <A href='/auth/recovery' bsStyle='secondary'>
               Забыли пароль?
            </A>
          </p> */}
          <div styleName='socials'>
            {socials.map(social => (
              <div styleName='social-wrap'>
                <Link href='/auth/asd' styleName='social'>
                  {social.icon}
                </Link>
              </div>
            ))}
          </div>
        </form>
      </Slide>
    </Page>
  }
}
