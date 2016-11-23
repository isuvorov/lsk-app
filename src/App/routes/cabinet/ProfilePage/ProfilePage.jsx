import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import { Grid, Row, Col } from 'react-bootstrap';
import Preloader from '../../components/Preloader'
import Card from '../../components/Card'

// @importcss(require('./HomePage.css'))
@inject('user')
@observer
export default class ProfilePage extends Component { //eslint-disable-line
  componentDidMount() {
    this.state = {
      status: 'wait'
    }
  }
  render() {
    const user = this.props.user

    return (
      // <div>
        // <Container>
          <Row>
            <Col md={4} sm={6} xs={12}>
              <Card title='profile' >
                {JSON.stringify(user)}
              </Card>
            </Col>

          </Row>
        // </Container>
      // </div>
    );
  }
}
