import React from 'react';
import EventEmitter from 'eventemitter3';
import moment from 'moment';
import 'moment/locale/ru';
import AppForm from 'lsk-quiz/Quiz/AppForm';
import App from 'lsk-quiz/Quiz/AppGame/App';
import Slide from 'lsk-general/General/Slide';
import Modal from 'lsk-general/General/Modal';
import Api from '../../api/api.client';
import CertForm from 'lsk-quiz/Quiz/CertForm';
import Cert from 'lsk-quiz/Quiz/Cert';
import Button from 'react-bootstrap/lib/Button';
import YkassaQuickpayButton from './Ykassa/YkassaQuickpayButton';
// import EventEmitter from 'eventemitter3'
// import HomePage from './HomePage'
import getData from './getData';

const api = new Api({
  base: '/',
});
export default {
  path: '/game/:id',
  async action({ app, ctx, params, query, appStore }) {
    const user = appStore.auth.user;
    if (!user) {
      return { redirect: '/auth' }
    }
    const data = await getData(ctx, app, params);
    const game = data.game;

    const test = {
      tasks: game.tasks,
    };


    if (test.tasks && test.tasks[0].platform === 'quizard') {
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
          ...require('./test').default,
          params: {
            answerTime: 30000,
            willStartAtOffset: 7000,
          },
        },
        scenario: {
          class: 'BotScenario',
          bots: [
            {
              id: 'bot1',
              name: 'Роман Калинкин',
              avatar: 'https://pp.vk.me/c622627/v622627171/475f5/-Nf0MOGioeU.jpg',
              bot: 'random',
            },
            {
              id: 'bot2',
              name: 'Игорь Суворов',
              avatar: 'https://pp.vk.me/c637431/v637431029/1d2ee/igmgxhTd5vU.jpg',
              bot: 'random',
            },
            {
              id: 'bot3',
              name: 'Анастасия Понамарёва',
              avatar: 'https://pp.vk.me/c413023/v413023046/4703/S9LfABfkdOw.jpg',
              bot: 'random',
            },
          ],
        },
      };
      const layoutFinishContent = <div>
        <h2>Дальнейшие действия</h2>
        <Button bsStyle='primary'>
          Пройти еще раз
        </Button>
        &nbsp;
        <Button bsStyle='primary'>
          Выбрать другую тему
        </Button>
        &nbsp;

        <Button bsStyle='primary'>
          Перейти в личный кабинет
        </Button>
      </div>


      return {
        component: <Slide
          full
          stretch
          image="https://pp.vk.me/c636819/v636819936/3474a/g6I0ETjiQ4I.jpg"

          // image={require('./bgs/bg2.jpg')}
        >
          <App
            {...app}
            layoutFinishContent={layoutFinishContent}
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
