import React, { Component } from 'react'
import AppForm from 'lsk-quiz/Quiz/AppForm'
// import Slides from 'lsk-general/General/Slides'
// import Page from 'lsk-general/General/Page'
import data from './data'
//
// export default class HomePage extends Component {
//   render() {
//     const data = data.get
//
//
//     Categories.find()
//
//
//     if (__CLIENT__) {
//       return ReactDOM.findElemtn
//     }
//     return <div>
//       Home
//     </div>
//     // return <MomentumPage data={{
//     //   cards: data.getCategories(),
//     //   categories: data.getTags(),
//     //   // tags: data.getTags(),
//     // }} />
//   }
// }


import React, { Component } from 'react'
import Task from '../Task/Task'
import importcss from 'importcss'

@importcss(require('./AbbForm.css'))
export default class AbbForm extends Component {
  constructor() {
    super()
    this.state = {
      taskIndex: 0,
      answers: [],
    }
  }

  render() {
    const tasks = this.props.test.tasks
    const props = {
      onSubmit: (value) => {
        const nextTaskIndex = this.state.taskIndex + 1
        this.state.answers.push(value)
        this.setState({
          taskIndex: nextTaskIndex,
        })
        if (!tasks[nextTaskIndex]) {
          this.props.onFinish && this.props.onFinish(this.state.answers)
          return;
        }
      },
    }
    const task = tasks[this.state.taskIndex]

    return <div styleName='root'>
      <If condition={task}>
        <Task key={this.state.taskIndex} {...task} {...props} />
      </If>
      <If condition={!task}>
        The end
        {/* {tasks && tasks.map((task, i) => {
          return <div key={i}>{JSON.stringify(task)}</div>
        })} */}
      </If>
    </div>
  }
}
