import React, {Component} from 'react'
import {
  Col,
  Row,
  Grid,
  ButtonToolbar,
  ButtonGroup,
  Button
} from 'react-bootstrap'
import paymentTypes from './paymentTypes'

import Form from "blocks/MMM/Form";


export default class YkassaShopButton extends Component {

  constructor(props) {
    super(props)
    //https://demomoney.yandex.ru/eshop.xml
    //https://money.yandex.ru/eshop.xml
    this.state = {
      paymentKey: "AC"
    }
    this.fields = _.omit(this.props, "action")
  }

  render() {
    // 410014023091136
    // 41001548057966
    //
    // fields

    var cert = this.props.cert || {};

    var paymentType = _.find(paymentTypes, {key:this.state.paymentKey})

    var paymentsToolbar = <ButtonToolbar>
      <ButtonGroup>
        {paymentTypes.map((payment, i) => {
          var bsStyle = this.state.paymentKey == payment.key
            ? "primary"
            : "default";
          var onClick = (e) => {
            this.setState({paymentKey: payment.key})
          }
          return <Button key={i} bsStyle={bsStyle} onClick={onClick}>
            <img src={payment.image} style={{
              height: 32
            }}/>
          </Button>
        })}
      </ButtonGroup>
    </ButtonToolbar>

    // var cert
    //
    const onSubmit = function(){
      try{
        mmm.event({
          target: "YkassaShopButton/buy",
          paymentType: paymentType.title,
          value: this.props.targets
        })
      }catch(e){}
      return true;
    }

    return <div styleName='view-wrapper' style={{
      background: "white",
      padding: 20
    }}>

      <Form method="POST" target="_blank" action={this.props.action}  mmm={{
        category: "YkassaShopButton",
        action: "submit"
      }}>
        {/*<input name="label" type="hidden" value="labellabel"/>*/}

        <input name="paymentType" type="hidden" value={this.state.paymentKey}/>


        {
          _.map(this.fields, function(value, key){
            return <input type="hidden" name={key} key={key} value={value} />
          })
        }

        <Row>
          <Col md={4}>
            Стоимость:
          </Col>
          <Col md={8}>
            <b>
              {this.props.sum}
              руб
            </b>
            <br/>
            без дополнительных комиссий.
            <br/>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            Цель платежа:
          </Col>
          <Col md={8}>
            <b>{this.props.targets}</b>
            <br/>
            <br/>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            Способ оплаты:
          </Col>
          <Col md={8}>
            {paymentsToolbar}
            <br/>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            Выбранный способ оплаты:
          </Col>
          <Col md={8}>
            <b>
              {paymentType.title}
            </b>
            <br/>
            <br/>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div style={{
              textAlign: "center"
            }}>
              <Button type="submit" bsStyle="success" bsSize="large">
                Купить
              </Button>
            </div>
          </Col>
        </Row>

      </Form>

    </div>

  }
}
