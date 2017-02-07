import getData from './getData';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default {
  async action({ app, ctx, next }) {
    const data = await getData(ctx, app);
    const categories = _.keyBy(data.categories, 'categoryId')
    console.log('data', data);
    const games = data.games.map(game => {
      const fullname = ['lastname', 'firstname', 'middlename'].map(k => game.cert && game.cert[k]).filter(k => k).join(' ')
      return {
        id: game._id,
        fullname,
        category: categories[game.categoryId] && categories[game.categoryId].title,
        result: game.result && (Math.round(game.result.score * 100) + '%'),
        correct: game.result && (game.result.correct + '/' + game.result.count),
      }
    })
    return {
      component: <div>
        <Grid>
          <h1>Игры пользователей</h1>
          <BootstrapTable data={games} striped hover>
            <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
            <TableHeaderColumn dataField="fullname">Пользователь</TableHeaderColumn>
            <TableHeaderColumn dataField="category">Категория</TableHeaderColumn>
            <TableHeaderColumn dataField="result">result</TableHeaderColumn>
            <TableHeaderColumn dataField="correct">correct</TableHeaderColumn>
          </BootstrapTable>
        </Grid>
      </div>,
    };
  },
};
