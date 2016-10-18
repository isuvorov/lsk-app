import Card from './Card'

module.exports = function ({ storiesOf, action }) {
  return storiesOf('Card', module)
    .add('Sample 1', () => (
      <Card>
        Sample content
      </Card>
    ))
    .add('Sample 2', () => (
      <Card title='Sample title'>
        Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
      </Card>
    ))
    .add('Separator', () => (
      <Card title='Sample title'>
        Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
        <Card.Separator />
        Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
        <Card.Separator />
        Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
      </Card>
    ))
    .add('Content', () => (
      <Card title='Sample title'>
        <Card.Content>
          Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
          <Card.Separator />
          Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
          <Card.Separator />
          Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
        </Card.Content>
      </Card>
    ))
    .add('Login Card', () => (
      <Card title='Войти'>
        <Card.Item icon={123}>
          Почта
          <input />
        </Card.Item>
        <Card.Item icon={354345}>
          Пароль
          <input />
        </Card.Item>
        <Card.Content>
          Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
          <Card.Separator />
          Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
          <Card.Separator />
          Sample text sample texte text sample texte text sample texte text sample texte text sample texte text sample texte text sample text
        </Card.Content>
      </Card>
    ))

    .add('Card with margins', () => (
      <Card margins>
        Sample content
      </Card>
    ))
    .add('Have not', () => (
      <Card wrap>
        Впервые на Skill Branch?
        &nbsp;
        <a href='йцу'>
           Создайте аккаунт
        </a>
      </Card>
    ))
    // .add('Sample 2', () => (
    //   <Card
    //     link="http://vk.com"
    //     image='//cdn.mgbeta.ru/inessa/iq/1.jpg'
    //     title='Окружающий мир'
    //     subtitle='Братья наши меньшие'
    //     />
    // ))
    // .add('Without subtitle', () => (
    //   <Card
    //     link="http://vk.com"
    //     image='//cdn.mgbeta.ru/inessa/iq/1.jpg'
    //     title='Окружающий мир'
    //     />
    // ))
    // .add('Without title', () => (
    //   <Card
    //     link="http://vk.com"
    //     image='//cdn.mgbeta.ru/inessa/iq/1.jpg'
    //     subtitle='Окружающий мир'
    //     />
    // ))
    // .add('Without link', () => (
    //   <Card
    //     image='//cdn.mgbeta.ru/inessa/iq/1.jpg'
    //     title='Окружающий мир'
    //     subtitle='Окружающий мир'
    //     />
    // ))
}
