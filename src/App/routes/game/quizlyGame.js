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
import bots from './bots';


export default ({ game, platform, params, appStore }) => {
  const api = appStore.api;
  const mobxuser = appStore.user;
  const user = {
    _id: mobxuser._id,
    name: mobxuser.fullName,
    avatar: mobxuser.profile.avatar || mobxuser.avatar,
  }
  console.log('@@@!', {user});
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
        avatar: b.avatar,
        // avatar: platform === 'lico' ? null : b.avatar,
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

  return (
    <Slide
      full
      stretch
      image={platform === 'quizard' ? '//pp.userapi.com/c636819/v636819936/34bbb/Eb4xNlxK7ys.jpg' : 'http://race-robotics.com/wp-content/uploads/2016/10/yumi-abb-robot.jpg'}
    >
      <App
        {...app}
        layoutFinishContent={layoutFinishContent}
        onFinish={async () => {
          await api.fetch(`/game/save?id=${params.id}`, {
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
        }}
      />
    </Slide>
  );
};
