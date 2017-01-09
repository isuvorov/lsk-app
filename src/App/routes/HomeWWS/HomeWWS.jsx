import React, { Component } from 'react'
import Slide from 'lsk-general/General/Slide'
import Slides from 'lsk-general/General/Slides'
import Page from 'lsk-general/General/Page'
import Form2 from 'lsk-general/General/Form'
import { autobind } from 'core-decorators'
import { Button, Table, Grid, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'


const fields = [
  {
    path: 'tickets',
    title: 'tickets',
    help: 'Количество сгенерированных тикетов',
    value: 100,
  },
  {
    path: 'ticketIdStart',
    title: 'ticketIdStart',
    help: 'ID первого тикета',
    value: 231,
  },
  {
    path: 'ticketIdProb',
    title: 'ticketIdProb',
    help: 'Вероятность, что ID тикета будет использоваться',
    value: 0.95,
  },
  {
    path: 'urgentProb',
    title: 'urgentProb',
    help: 'Вероятность типа urgent у тикетов',
    value: 0.2,
  },
  {
    path: 'isWeekendProb',
    title: 'isWeekendProb',
    help: 'Вероятность того, что тикет попадет на выходной день',
    value: 0.1,
  },
  {
    path: 'resolvedDays',
    title: 'resolvedDays',
    help: 'Среднее время resolved тикетов',
    value: 90,
  },
  {
    path: 'resolvedProb',
    title: 'resolvedProb',
    help: 'Вероятность, что тикет впринципи будет resolved',
    value: 0.9,
  },
  {
    path: 'mainOfficeProb',
    title: 'mainOfficeProb',
    help: 'Вес того, что главный офис будет выбран тикетом (у всех остальных вес = 1)',
    value: 1.2,
  },
  // {
  //   path: 'startedAt',
  //   title: 'startedAt',
  //   help: 'startedAt',
  //   value: '2016-01-01',
  // },
  // {
  //   path: 'finishedAt',
  //   title: 'finishedAt',
  //   help: 'finishedAt',
  //   value: '2016-01-01',
  // },
]


const Data = require('./data').default
const data = new Data({});
// let d = null
// const props = {
//   startedAt: new Date('2014-01-01'),
//   finished: new Date('2016-12-31'),
//   tickets: 100,
// }
// data.generate(props);
// let d = data.getData();


require('./some.global.css')
import importcss from 'importcss'
@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      i: 1,
      month: 1,
    }
  }
  @autobind
  handleSubmit(props) {
    // console.log({props});
    data.generate(props);
    this.setState({
      i: this.state.i + 1,
      month: 1,
      data: props,
    })
  }
  //
  // @autobind
  // onSubmit(e) {
  //   e.preventDefault();
  //   // console.log(this.ticketIdStart);
  //   // console.log(this.ticketIdStart.value);
  //
  //
  //   const props = {
  //     ticketIdStart: +this.ticketIdStart.value,
  //     tickets: +this.tickets.value,
  //     isWeekendProb: +this.isWeekendProb.value,
  //     urgentProb: +this.urgentProb.value,
  //   }
  //   console.log({props});
  //   data.generate(props);
  //
  //   this.setState({
  //     i: this.state.i + 1,
  //     month: 1,
  //   })
  //
  // }
  //
  renderReport(dates) {
    const d = data.getData(dates[0], dates[1]);
    const tickets = _.sortBy(d.tickets, 'categoryId')
    // console.log(d);
    return <div>
      <h1>
        STATEMENT OF SERVICES
      </h1>
      <p>
        This Statement of Services effective as of December 01, 2016, is made pursuant to and is a part of that certain SUPPORT SERVICES AND LICENSE AGREEMENT No. 01/01.01, dated as of February -1, 2014 (the “Agreement”), by and between Worldwide Solutions FZ-LLC (“WWS”), and Full Legal Name of Customer (“Customer”), describes in detail the services performed by Worldwide solutions FZ LLC between 1 November 2016 and 30 November 2016.
      </p>
      <p>
        This Statement is governed by the terms and conditions of the Agreement. Any defined terms not otherwise defined herein shall have the meanings set forth in the Agreement.
      </p>
      <p>
        This Statement specifies (among other things) the Support Services, License Usage and Monitoring Services that were performed by WWS at the Premises identified on Exhibit A in the Agreement and as per the list of such services identified in Exhibit B in the Agreement.
      </p>

      <h2>
        1. SUPPORT SERVICES
      </h2>

      <Table bordered striped>
        <thead>
          <tr>
            <th>
              Summary
            </th>
            <th>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              New support tickets opened in the current period
            </td>
            <td>
              {d.support.summary.new}
            </td>
          </tr>
          <tr>
            <td>
              New urgent support tickets
            </td>
            <td>
              {d.support.summary.status.urgent || 0}
            </td>
          </tr>
          <tr>
            <td>
              Support tickets closed and resolved in the current period
            </td>
            <td>
              {d.support.summary.resolved}
            </td>
          </tr>
        </tbody>
      </Table>

      <Table bordered striped>
        <thead>
          <tr>
            <th>
              Subject
            </th>
            <th>
              Category
            </th>
            <th>
              Ticket
            </th>
          </tr>
        </thead>
        <tbody>
          <For each="item" of={ tickets }>
            <tr>
              <td>
                {d.categories[item.categoryId - 1][0]}
              </td>
              <td>
                {d.categories[item.categoryId - 1][1]}
              </td>
              <td>
                #{item.id}, {item.date.toISOString().substr(0, 10)}, {item.status}, Berlin
                <br />
                {item.title}
              </td>
            </tr>
          </For>

          {/* <tr>

            <td>
              Various troubleshooting
            </td>
            <td>
              #502, 2016-11-27, Urgent, Berlin
              <br />
              СРОЧНО Прошу зарегистрировать домен для нового ВЦ
            </td>
          </tr> */}
        </tbody>
      </Table>


      <h2>
        2. MONITORING REPORT
      </h2>

      <Table bordered striped>
        <thead>
        <tr>
          <th>
            Summary
          </th>
          <th>
            Quantity
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Overall uptime
          </td>
          <td>
            99.6269%
          </td>
        </tr>
      </tbody>
      </Table>

      <Table bordered striped>
        <thead>
          <tr>
            <th>
              Subject
            </th>
            <th>
              Description
            </th>
            <th>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <For each="item" of={ d.monitoringCategories }>
            <tr>
              <td>
                {item[0]}
              </td>
              <td>
                {item[1]}
              </td>
              <td>
                OK: 99.6269%, Problems: 0.3731%, 3 events, 9min duration total
              </td>
            </tr>
          </For>
          {/* <tr>
            <td rowSpan={2}>
              Domain name
            </td>
            <td>
              Availability
            </td>
            <td>
              OK: 99.6269%, Problems: 0.3731%, 3 events, 9min duration total
            </td>
          </tr>
          <tr>
            <td>
              Resolving
            </td>
            <td>
              OK: 99.6269%, Problems: 0.3731%, 3 events, 9min duration total
            </td>
          </tr> */}
        </tbody>
      </Table>


      <h2>
        3. LICENSE USAGE REPORT
      </h2>

      <Table bordered striped>
        <thead>
          <tr>
            <th>
              Product
            </th>
            <th>
              Usage
            </th>
            <th>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={3}>
              Application software «Finreport»
            </td>
            <td>
              Number of transactions added
            </td>
            <td>
              100
            </td>
          </tr>
          <tr>
            <td>
              Number of active licenses
            </td>
            <td>
              2
            </td>
          </tr>
          <tr>
            <td>
              Reports generated
            </td>
            <td>
              15
            </td>
          </tr>

          <tr>
            <td rowSpan={2}>
              Application software «Contacts»
            </td>
            <td>
              Contacts total count in database
            </td>
            <td>
              1
            </td>
          </tr>
          <tr>
            <td>
              Contacts added this month
            </td>
            <td>
              2
            </td>
          </tr>

          <tr>
            <td rowSpan={3}>
              Application software «Electronic record»
            </td>
            <td>
              Number of active licenses
            </td>
            <td>
              2
            </td>
          </tr>
          <tr>
            <td>
              Number of clients added
            </td>
            <td>
              2
            </td>
          </tr>
          <tr>
            <td>
              Reports generated
            </td>
            <td>
              15
            </td>
          </tr>
        </tbody>
      </Table>
      <h4>
        WORLDWIDE SOLUTIONS FZ-LLC
      </h4>
      <p>
        By: 	Pavel Petrakov, Managing Director
        <br />
        ___________________________________
        <br />
        (signature of an authorized officer)
      </p>
      <h4>
        THE CUSTOMER
        <br/>
        Full Legal Name of Customer:
      </h4>
      <p>
        By: 	_______________________
        <br />
        ___________________________________
        <br />
        (signature of an authorized officer)
      </p>
    </div>
  }

  render() {
    const dates = [new Date(`2016-${this.state.month}-01`), new Date(`2016-${this.state.month + 1}-01`)]
    return <Page>
      <Slides>
        <Grid>
          <Form2
            horizontal
            fields={fields}
            onSubmit={this.handleSubmit}
          />
          <If condition={this.state.data}>
            {_.range(1, 13).map(i => {
              return <Button onClick={() => this.setState({month: i})} bsStyle={this.state.month == i ? 'success' : 'default'}>
                {i}
              </Button>
            })}
            <hr />
            <br/>
            <br/>
            {this.renderReport(dates)}
          </If>
        </Grid>
      </Slides>
    </Page>
  }
}
