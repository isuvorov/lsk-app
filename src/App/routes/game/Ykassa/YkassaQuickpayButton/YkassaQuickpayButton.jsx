import React, { Component } from 'react';
import {
  Col,
  Row,
  Grid,
  ButtonToolbar,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import initialPaymentTypes from '../YkassaShopButton/paymentTypes';

export default class YkassaQuickpayButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paymentKey: 'AC',
    };
  }

  render() {
    // 410014023091136
    // 41001548057966

    const paymentTypes = [initialPaymentTypes[0], initialPaymentTypes[1], initialPaymentTypes[3]];

    const paymentsToolbar = (<ButtonToolbar>
      <ButtonGroup>
        {paymentTypes.map((payment) => {
          const bsStyle = this.state.paymentKey === payment.key
            ? 'primary'
            : 'default';
          const onClick = (e) => {
            this.setState({ paymentKey: payment.key });
          };
          return (<Button bsStyle={bsStyle} onClick={onClick}>
            <img
              src={payment.image} style={{
                height: 16,
              }}
            />
          </Button>);
        })}
      </ButtonGroup>
    </ButtonToolbar>);

    const sum = this.props.sum || this.props.value
    return (
      <form
        method="POST" target="_blank" action="https://money.yandex.ru/quickpay/confirm.xml" mmm={{
          category: 'YkassaQuickpayButton',
          action: 'submit',
        }}
      >
        {/* <input name="label" type="hidden" value="labellabel"/>*/}

        <input name="paymentType" type="hidden" value={this.state.paymentKey} />
        <input name="receiver" type="hidden" value={this.props.receiver} />

        <input name="short-dest " type="hidden" value="short-dest short-dest " /> {/* <input name="formcomment" type="hidden" value="formcommentformcomment"/>*/}
        <input name="targets" type="hidden" value={this.props.targets} />

        <input name="comment" type="hidden" value={this.props.comment} />

        <input name="sum" type="hidden" value={sum} />

        <input name="quickpay-form" type="hidden" value="shop" /> {/* <input name="referer" type="hidden" value=""/>*/}
        <input name="is-inner-form" type="hidden" value="true" />
        <input name="need-phone" type="hidden" value="false" />
        <input name="need-email" type="hidden" value="false" />

        <input type="hidden" name="successURL" value={this.props.successUrl || this.props.successURL} />

        <Row>
          <Col md={4}>
            Стоимость:
          </Col>
          <Col md={8}>
            <b>
              {sum}
              руб
            </b>
            <br />
            без дополнительных комиссий.
            <br />
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            Цель платежа:
          </Col>
          <Col md={8}>
            <b>{this.props.targets}</b>
            <br />
            <br />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            Способ оплаты:
          </Col>
          <Col md={8}>
            {paymentsToolbar}
            <br />
            <br />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Button type="submit" bsStyle="success" bsSize="large">
                Купить
              </Button>
            </div>
          </Col>
        </Row>

      </form>
    );
  }
}
