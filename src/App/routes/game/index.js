import React from 'react';
import EventEmitter from 'eventemitter3';
import _ from 'lodash';
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
// import EventEmitter from 'eventemitter3'
// import HomePage from './HomePage'
import getData from './getData';
import bots from './bots';

const api = new Api({
  base: '/',
});
export default {
  path: '/game/:id',
  async action({ app, ctx, params, query, appStore }) {
    const user = appStore.auth.user;
    if (!user) {
      return { redirect: '/auth' };
    }
    const data = await getData(ctx, app, params);
    const game = data.game;
    // console.log({game});`

    if (!game.tasks || !game.tasks.length) throw '!game.tasks';
    const platform = game.tasks[0].platform || 'momentum';

    const test = {
      tasks: game.tasks,
    };


    if (test.tasks && (platform === 'quizard' || platform === 'lico')) {
      const app = {
        userId: user._id,
        game: {
          class: 'PrimaryGame',
          users: [
            {
              id: user._id,
              name: user.name,
              avatar: user.avatar,
            },
          ],
          tasks: game.tasks,
          results: game.results,
          startedAt: game.startedAt,
          finishedAt: game.finishedAt,
          params: {
            answerTime: 30000,
            willStartAtOffset: 7000,
            shuffleTasks: false,
          },
        },
        scenario: {
          class: 'BotScenario',
          bots: _.sampleSize(bots, 3).map((b, i) => ({
            ...b,
            avatar: test.tasks[0].platform === 'lico' ? null : b.avatar,
            bot: 'random',
            id: `bot${i}`,
          })),
        },
      };
      const layoutFinishContent = (
        <div>
          <h2>Дальнейшие действия</h2>
          {/* <Button href={`/game/${params.id}`} bsStyle="primary">
            Пройти еще раз
          </Button> */}
        &nbsp;
          <Button href="/" bsStyle="primary">
          Выбрать другую тему
        </Button>
        &nbsp;

          <Button href="/cabinet" bsStyle="primary">
          Перейти в личный кабинет
        </Button>
        </div>
      );

      async function onFinish2(data) {
        // console.log('ON FINISH @@@', data, this);
        // alert('ON FINISH');
        // answers
        return await api.fetch(`/game/save?id=${params.id}`, {
          method: 'POST',
          body: data,
        })
        .then((res) => {
          // location.reload();
        })
        .catch((err) => {
          console.log({ err });
          alert('Ошибка');
        });
      }


      return {
        component: <Slide
          full
          stretch
          image={platform === 'quizard' ? '//pp.userapi.com/c636819/v636819936/34bbb/Eb4xNlxK7ys.jpg' : 'http://race-robotics.com/wp-content/uploads/2016/10/yumi-abb-robot.jpg'}
          // image={require('./bgs/bg2.jpg')}
        >
          <App
            {...app}
            layoutFinishContent={layoutFinishContent}
            onFinish={onFinish2}
          />
        </Slide>,
      };
    }

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
  },
};
