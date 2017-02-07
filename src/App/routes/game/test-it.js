function options(answers) {
  return answers.map((title, index) => ({
    value: index,
    title,
  }));
}
function buttons(answers) {
  return {
    type: 'button',
    options: options(answers),
  };
}
const test = {
  tasks: [
    {
      question: {
        title: 'Правильно ли следующее утверждение',
        text: '"Политическая власть - это способность управляющих подчинять своей воле управляемых"?',
      },
      checker: {
        type: 'match',
        value: true,
      },
      decision: {
        type: 'buttons',
        view: '2column',
        options: [
          {
            value: true,
            title: 'Нет',
          },
          {
            value: false,
            title: 'Да',
          },
        ],
      },
    },
    {
      question: {
        title: 'Определите мотивационный статус сотрудника, если он в ответ на поставленную задачу говорит следующее: «В принципе, понятно. Это как-то отразится на моем бонусе?»',
      },
      checker: {
        type: 'match',
        value: 0,
      },
      decision: {
        type: 'radio',
        options: [
          {
            value: 0,
            title: 'Внешний',
          },
          {
            value: 1,
            title: 'Автоматический',
          },
          {
            value: 2,
            title: 'Интегрированный',
          },
          {
            value: 3,
            title: 'Согласованный',
          },
        ],
      },
    },

    {
      question: {
        title: 'Определите всех собак на фотографиях',
      },
      checker: {
        type: 'set',
        value: [0, 1, 2],
      },
      decision: {
        type: 'checkbox',
        view: 'grid',
        options: [
          {
            value: 0,
            image: 'https://pp.vk.me/c627420/v627420258/22455/FCdwTY_j96s.jpg',
          },
          {
            value: 1,
            image: 'https://pp.vk.me/c628416/v628416081/25b9d/hlqwzGKtdds.jpg',
          },
          {
            value: 2,
            image: 'https://pp.vk.me/c629208/v629208244/23be7/JUGFZ3s8Ol0.jpg',
          },
          {
            value: 3,
            image: 'https://pp.vk.me/c629529/v629529444/1d5fe/CpN29Q9qHXo.jpg',
          },
          {
            value: 4,
            image: 'https://pp.vk.me/c629529/v629529163/21487/55Fs4ZTMnWk.jpg',
          },
        ],
      },
    },
    {
      question: {
        title: 'В чае не содержатся вещества, способствующие похуданию.',
      },
      checker: {
        type: 'match',
        value: 1,
      },
      decision: {
        type: 'buttons',
        options: [
          {
            value: 1,
            title: 'Да',
          },
          {
            value: 2,
            title: 'Возможно',
          },
          {
            value: 0,
            title: 'Нет',
          },
        ],
      },
    },
    {
      md: 'Вопрос с вводом 1 ответа',
      question: {
        title: 'Что такое УТП?',
      },
      checker: {
        type: 'oneOf',
        params: {
          lowercase: true,
        },
        value: [
          'уникальное торговое предложение',
          'уникальное товарное предложение',
        ],
      },
      decision: {
        type: 'input',
      },
    },

  ],
  tasks2: [
    {
      question: {
        title: 'Оцените уровень подачи материала в вебинаре?',
      },
      decision: buttons(['Ничего не понятно, нужно попроще', 'Самый раз, большую часть лекции понял', 'Все слишком просто и банально, скучал', ]),
    },
    {
      question: {
        title: 'Вы программист?',
        text: 'Считаете ли вы себя сейчас программистом или человеком со складом ума программиста?',
      },
      decision: buttons(['Да', 'Нет', 'Не знаю, но очень бы хотел']),
    },
    {
      question: {
        title: 'Сколько вы планируете уделять времени интенсиву?',
        text: 'Количество часов в неделю, включая просмотр вебинаров',
      },
      decision: buttons(['2 часа', '6 часов', '12 часов', '18 часов', '20+']),
    },
    {
      question: {
        title: 'На какой ОС вы планируете проходить интенсив?',
      },
      decision: buttons(['Windows', 'Linux', 'Mac OS', 'Что-то более экзоческое :)']),
    },
    {
      question: {
        title: 'Вы уже выбрали себе IDE/Editor?',
      },
      decision: buttons([
        'Sublime',
        'Atom',
        'WebStorm, PhpStorm, IDEA ...',
        'Visual Studio, VS code ...',
        'Кое-что покруче',
        'Еще не определился',
      ]),
    },
    {
      question: {
        title: 'Вы писали раньше на JavaScript? ?',
      },
      decision: buttons([
        'Да, было дело, давным давно',
        'Да, пару лет назад, это точно был ES5',
        'Да, пробовал ES6',
        'Да, пользуюсь всеми новыми фишками ES2015-2017',
        'Нет',
      ]),
    },
    {
      question: {
        title: 'Какие языки вы еще знаете?',
        text: 'Более менее знаете, например сможете написать там пару функций и решить пару практических задач. ',
      },
      decision: {
        type: 'checkbox',
        view: '2column',
        options: options(['C', 'C++', 'Pascal', 'Python', 'Ruby', 'PHP', 'Java', 'HTML', 'SQL', 'TypeScript']),
      },
    },
    {
      question: {
        title: 'Считате ли вы JavaScript лучшим языком в мире? ;)',
        image: 'http://www.globalnerdy.com/wordpress/wp-content/uploads/2012/01/javascript-wat.jpg',
      },
      decision: {
        type: 'buttons',
        options: options(['Да', 'Нет']),
      },
    },
    {
      question: {
        title: 'Вы понимаете, что нарисовано на этой схеме?',
        image: 'https://mdn.mozillademos.org/files/8633/promises.png',
      },
      decision: {
        type: 'buttons',
        options: options(['Да', 'Нет']),
      },
    },
    {
      question: {
        title: 'Что бы вы выбрали из ниже перечисленного?',
      },
      decision: {
        type: 'checkbox',
        view: '2column',
        options: options(['Angular', 'Ember', 'Knockout', 'React', 'Vue', 'Backbone', 'jQuery', 'Polymer', 'Не понимаю о чем вы']),
      },
    },
    {
      question: {
        title: 'Вы понимаете, что изображено на этой картинке?',
        image: 'http://image.slidesharecdn.com/js-notatoylanguage-160328093656/95/javascript-no-longer-a-toy-language-38-638.jpg?cb=1459157941',
      },
      decision: {
        type: 'buttons',
        options: options(['Да', 'Нет']),
      },
    },
    {
      question: {
        title: 'Что бы вы выбрали из ниже перечисленного?',
      },
      decision: {
        type: 'checkbox',
        view: '2column',
        options: options(['Flux', 'Reflux', 'Redux', 'Mobx', 'Не понимаю о чем вы']),
      },
    },
  ],
};
// test.tasks = [test.tasks[0]]


export default test
