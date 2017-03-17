import _ from 'lodash';
export default (questions) => {
  const getQuestion = (answers) => {
    const answer1 = answers[0];
    const question = {
      platform: answer1.platform,
      categoryId: answer1.categoryId,
      question: {
        title: answer1.question,
      },
    };
    if (answers.length === 1) {
      return {
        ...question,
        params: {
          answerTime: 10 * 60 * 1000,
        },
        decision: {
          type: 'textarea',
          rows: 6,
        },
        group: 'advanced',
      };
    }
    //
    const answersRight = _.groupBy(answers, 'right');
    const length = 5;
    // const right = _.random(1, 4);
    const right = 2;

    const getRandom = () => {
      const options = _.shuffle([
        ..._.sampleSize(answersRight['Да'], right),
        ..._.sampleSize(answersRight['Нет'], length - right),
      ])
      .map((option, value) => ({ ...option, value }));

      // const question = _.pick(answers[0], ['platform', 'categoryId', 'question']);
      const rightValues = options.filter(option => option.right == 'Да').map(option => (option.value))
      return {
        ...question,
        checker: {
          type: 'set',
          flex: 1,
          value: rightValues,
        },
        decision: {
          type: 'checkbox',
          length: rightValues.length,
          options: options.map(option => ({
            value: option.value,
            title: option.answer,
          })),
        },
      };
    };

    return [getRandom(), getRandom(), getRandom()];
  };
  const groups = _(questions)
  .groupBy('group')
  .map(getQuestion)
  .flatten()
  .value();

  return groups;
};
