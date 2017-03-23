import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Slide from 'lsk-general/General/Slide';

import Card from 'lsk-quiz/Momentum/Card';
import Content from 'lsk-quiz/Momentum/Content';
import NavBar from '../_layouts/NavBar';


export default class CategoryPage extends Component { //eslint-disable-line
  render() {
    return (
      <div>
        {/* <NavBar title={this.props.title} /> */}
        <Slide
          full
          fixed
          overlay="rgba(0,0,0,0.5)"
          image={this.props.image}
          style={{
            color: '#fff',
          }}
        >
          <Grid>
            <div>
              <div style={{ textAlign: 'center' }}>
                <Content.Title>
                  {this.props.title}
                </Content.Title>
                <Content.Subtitle>
                  {this.props.subtitle}
                </Content.Subtitle>
              </div>

              <Row style={{ color: '#333' }}>
                {(this.props.categories || []).map(category => (
                  <Col md={4}>
                    <Card
                      wrap
                      {...category}
                    />
                  </Col>
                  ))}
              </Row>
            </div>

          </Grid>
        </Slide>
      </div>
    );
  }
}
