import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import Slide from 'lsk-general/General/Slide';
import Form from 'lsk-general/General/Form';

import Card from 'lsk-quiz/Abp/Card';
import Button from 'lsk-quiz/Abp/Button';
import Input from 'lsk-quiz/Abp/Input';
import Content from 'lsk-quiz/Abp/Content';


export class Page extends Component { //eslint-disable-line

  render() {


    return (
      <Slide
        full
        fixed
        overlay="rgba(0,0,0,0.5)"
        image="https://pp.vk.me/c636819/v636819936/3474a/g6I0ETjiQ4I.jpg"
        style={{
          color: '#fff',
        }}
      >
        <Grid>
          <div>
            <Content.Title style={{textAlign: 'center'}}>
              Выберите навык для тренировки
            </Content.Title>
            <Row style={{ color: '#333' }}>
              <Col md={4}>
                <Card
                  link="/game/create?categoryId=quizard1"
                  image= 'http://media.istockphoto.com/photos/worker-at-hardware-store-picture-id505747518?k=6&m=505747518&s=170667a&w=0&h=XYesI0oWGFPQEprAombnOoVLjIvPapCT2hm7TQxW6fs='
                  title="Знание ассортимента"
                />
              </Col>
              <Col md={4}>
                <Card
                  link="/game/create?categoryId=quizard1"
                  image="https://www.bls.gov/ooh/images/1580.jpg"
                  title="Навыки продаж"
                />
              </Col>
              <Col md={4}>
                <Card
                  link="/game/create?categoryId=quizard1"
                  image="http://blogs.salleurl.edu/antiguos-alumnos/files/2014/05/1.jpg"
                  // subtitle="Стратегия развития компании"
                  title="Стратегия компании"
                />
              </Col>
            </Row>
          </div>
        </Grid>
      </Slide>
    );
  }
}

export default {
  async action({ app, ctx, next }) {
    return {
      component: <Page />,
    };
  },
};
