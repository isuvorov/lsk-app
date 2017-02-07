import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Slide from 'lsk-general/General/Slide';
import Form from 'lsk-general/General/Form';
import Link from 'lsk-general/General/Link';

import Card from 'lsk-quiz/Abp/Card';
import Button from 'lsk-quiz/Abp/Button';
import Input from 'lsk-quiz/Abp/Input';
import Content from 'lsk-quiz/Abp/Content';


export default class CategoryPage extends Component { //eslint-disable-line
  renderNavbar() {
    const { user } = this.props;
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{this.props.title}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <If condition={user}>
            <Nav pullRight>
              {/* <NavItem eventKey={1} href="#">Link</NavItem> */}
              <NavDropdown eventKey={3} title={user.name} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Профиль</MenuItem>
                <MenuItem divider />
                <MenuItem
                  linkButton
                  containerElement={<Link href="/auth/logout" />}
                  eventKey={3.3}
                  href="/auth/logout"
                >
                  {/* <Link href='/auth/logout'> */}
                    Выйти
                  {/* </Link> */}
                </MenuItem>
              </NavDropdown>
            </Nav>
          </If>

          {/* <If condition={user}>
            <Nav pullRight>
              <Link href='/auth/logout'>
                <NavItem eventKey={1} href="/auth/logout">{user.name} (Вый)</NavItem>
              </Link>
            </Nav>
          </If> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }

  render() {
    return (
      <div>
        {this.renderNavbar()}
        <Slide
          full
          fixed
          overlay="rgba(0,0,0,0.5)"
          image={this.props.image}
          style={{
            color: '#fff',
          }}
          top="asdasdasd"
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
