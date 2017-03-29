import React from 'react';
import EventEmitter from 'eventemitter3';
import moment from 'moment';
import 'moment/locale/ru';
import AppForm from 'lsk-quiz/Quiz/AppForm';
import App from 'lsk-quiz/Quiz/AppGame/App';
import Slide from 'lsk-general/General/Slide';
import Modal from 'lsk-general/General/Modal';
import Api from '../../api/api.client';
import CertForm from 'lsk-quiz/Cert/CertForm';
import Cert from 'lsk-quiz/Cert/Cert';
import Button from 'react-bootstrap/lib/Button';
import YkassaQuickpayButton from './Ykassa/YkassaQuickpayButton';


export default ({ ctx, query, game, params, appStore }) => {
  const api = appStore.api;
    // console.log(game);
  const { ykassa } = ctx.config;
    // console.log(ctx);
  if (query.full) {
    return {
      component: <Cert
        {...game.cert}
        watermark={false}
      />,
    };
  }
  if (game.boughtAt) {
    const fixData = game.cert;

    return {
      component: <Slide
        fixed
        full
        image={require('./bg.jpg')}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white' }}>
              Поздравляем с победой!
            </h1>
          <br />
          <Cert
            zoom={0.5}
            {...fixData}
            watermark={false}
          />
          <br />
          <Button
            bsStyle="success"
            bsSize="large"
            href={game.certUrl}
            target="_blank"
          >
              Сохранить диплом
            </Button>
        </div>
      </Slide>,
    };
  }
  if (game.result) {
    const emitter = new EventEmitter();

    const buySert = (data) => {
      api.fetch(`/game/cert?id=${params.id}`, {
        method: 'POST',
        body: { cert: data },
      })
        .then((res) => {
          function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          }

          if (!validateEmail(data.email)) {
            alert('Некорректный Email, пожалуйста введите верный Email на него придет копия диплома.');
          } else {
            emitter.emit('open');
          }
        })
        .catch((err) => {
          console.log({ err });
          alert('Ошибка');
        });
    };
    const date = moment(new Date(game.finishedAt || game.createdAt)).format('LL');
    const number = `AA-${game._id.toString().substr(game._id.toString().length - 6)}`;
    const fixData = {
      ...game.cert,
      number,
      title: 'за 3 место',
      theme: 'Параллельное программирование',
      date,
        // priceOld: '200 руб',
      watermark: true,
      color: 'blue',
    };

    return {
      component: <Slide
        fixed
        full
        image={require('./bg.jpg')}
      >
        <Modal emitter={emitter}>
          <Modal.Content>
            <Modal.Header closeButton>
                Оплатить диплом
              </Modal.Header>
            <Modal.Body>
              <YkassaQuickpayButton
                receiver={ykassa.receiver}
                paymentKey="AC"
                targets={`Покупка диплома: ${number}`}
                comment={`id:${game._id}`}
                successUrl={`${ctx.config.host}/game/buy?id=${game._id}`}
                sum={ykassa.sum}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <CertForm
          badge={`${ykassa.sum} руб`}
          data={fixData}
          onSubmit={buySert}
        />
      </Slide>,
    };
  }

  async function onFinish(answers) {
    return await api.fetch(`/game/answer?id=${params.id}`, {
      method: 'POST',
      body: { answers },
    })
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        console.log({ err });
        alert('Ошибка');
      });
  }
    //
    //
  return {
    component: <Slide
      fixed
      full
      image={require('./bg.jpg')}
    >
      <AppForm test={test} onFinish={onFinish} />
    </Slide>,
  };
};
