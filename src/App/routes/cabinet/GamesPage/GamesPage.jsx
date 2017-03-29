import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import Usercard from 'lsk-quiz/Quiz/Usercard';
import Avatar from 'lsk-quiz/Quiz/Avatar';

// @importcss(require('./HomePage.css'))
@inject('user')
@observer
export default class GamesPage extends Component { //eslint-disable-line

  @autobind
  renderUser(user, i) {
    return (
      <Usercard
        key={i}
        {...user}
        // name="Евгений Грунин"
        // subtitle="Дизайнер-предприниматель"
        // avatar="https://pp.userapi.com/c628031/v628031795/4568d/Es7Kej0dRFo.jpg"
        // score={789}
        // scoreUp={789}
        // rank={12}
      />
    );
  }

  @autobind
  renderRow(game, i) {
    const gameRaw = game.raw;
    if (!game.raw) {
      if (this.props.showAll) {
        return (
          <tr key={i}>
            <td>
              <If condition={game.createdAt}>
                Начало: <br />
                {Date.toHumanString(game.createdAt)}
              </If>
              <If condition={game.createdAt && game.finishedAt}>
                <br />
                <br />
              </If>
              <If condition={game.finishedAt}>
                Завершение: <br />
                {Date.toHumanString(game.finishedAt)}
              </If>
            </td>
            <td colSpan={3}>
              Игра не завершена
            </td>
          </tr>
        );
      }
      return null;
    }
    const result = gameRaw.results.users[0];
    return (
      <tr key={i}>
        <td>
          <If condition={game.createdAt}>
            Начало: <br />
            {Date.toHumanString(game.createdAt)}
          </If>
          <If condition={game.createdAt && game.finishedAt}>
            <br />
            <br />
          </If>
          <If condition={game.finishedAt}>
            Завершение: <br />
            {Date.toHumanString(game.finishedAt)}
          </If>
        </td>
        <td>
          {/* {Date.toHumanString(game.raw)} */}
          {gameRaw.users.map(this.renderUser)}
        </td>
        <td>
          <If condition={result}>
            {result.position} место <br />
            {result.xp} очков <br />
            {result.statuses.right} верных ответов <br />
            {result.statuses.wrong} ошибок
          </If>
        </td>
        {/* <td><pre>{JSON.stringify(gameRaw.results.users[0], null, 2)}</pre></td> */}
        {/* <td>
          {Date.toHumanString(game.createdAt)}
          <hr />
          {Date.toHumanString(game.finishedAt)}
        </td> */}
        <td>
          <Button href={`/game/${game._id}`}>
            Посмотреть результаты
          </Button>
        </td>
      </tr>
    );
  }
  render() {
    const { user, games } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h2>Добро пожаловать {user.name}</h2>
            <If condition={!games}>
              <p>Вскоре здесь будет представлена статистика ваших игр</p>
            </If>
            <If condition={games}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Дата</th>
                    <th>Участники</th>
                    <th>Результат</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map(this.renderRow)}
                </tbody>
              </Table>
            </If>
          </Col>
        </Row>
      </Grid>
    );
  }
}
