// import MomentumPage from 'lsk-quiz/Abp/MomentumPage';
// import getData from './getData';
import { Grid, Row, Col } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import Slide from 'lsk-general/General/Slide';
import Form from 'lsk-general/General/Form';

import Card from 'lsk-quiz/Abp/Card';
import Button from 'lsk-quiz/Abp/Button';
import Input from 'lsk-quiz/Abp/Input';
import Content from 'lsk-quiz/Abp/Content';

import React, { Component } from 'react';


export class Page extends Component { //eslint-disable-line
  constructor() {
    super();
    this.state = {};
  }

  @autobind
  handleSubmit(data) {
    this.setState({
      page: 2,
    });
  }

  render() {
    return (<Slide
      full
      fixed
      image="//pp.vk.me/c636819/v636819936/34bbb/Eb4xNlxK7ys.jpg"
    >
      <Grid>
        <If condition={this.state.page == 2}>
          <div>
            <Content.Title>
              Выберите тему
            </Content.Title>
            <Row style={{ color: '#333' }}>
              <Col md={4}>
                <Card
                  link="/game/create?categoryId=quizard1"
                  image="//cdn.mgbeta.ru/inessa/iq/10.jpg"
                  title="Знание ассортимента"
                />
              </Col>
              <Col md={4}>
                <Card
                  link="/game/create?categoryId=quizard1"
                  image="//cdn.mgbeta.ru/inessa/iq/11.jpg"
                  title="Навыки продаж"
                />
              </Col>
              <Col md={4}>
                <Card
                  link="/game/create?categoryId=quizard1"
                  image="//cdn.mgbeta.ru/inessa/iq/12.jpg"
                  title="Стратегия развития"
                />
              </Col>
            </Row>
          </div>
        </If>
        <If condition={this.state.page != 2}>
          <Row>
            <Col md={6} mdOffset={3} style={{ color: 'white', textAlign: 'left' }}>
              <Content.Title>
                Quizard
              </Content.Title>
              <Content.Subtitle>
                Система обучения и тестирования сотрудников
              </Content.Subtitle>
              <Form
                fields={[
                  {
                    name: 'name',
                    title: 'Имя',
                    control: {
                      placeholder: 'Например, Василий',
                    },
                  },
                  {
                    name: 'password',
                    title: 'Пароль',
                    control: {
                      type: 'password',
                    },
                  },
                  {
                    name: 'email',
                    title: 'Email',
                    control: {
                      placeholder: 'Например, utkin@mail.ru',
                      type: 'email',
                    },
                  },
                ]}
                submitButton="Пройти тест"
                onSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
        </If>
      </Grid>
    </Slide>);
  }
}

export default {
  async action({ app, ctx, next }) {
    return {
      component: <Page />,
    };
  },
};
