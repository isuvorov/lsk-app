import { EditorBemjsonRoot } from './EditorBemjsonRoot';

module.exports = ({ storiesOf, action }) => {
  return storiesOf('EditorBemjsonRoot', module)
    .add('int', () => {
      const value = 123
      const schema = {
        title: 'Число',
        type: 'number',
        format: 'number',
      }
      return <EditorBemjsonRoot
        value={value}
        schema={schema}
      />
    })
    .add('string', () => {
      const value = 'string'
      return <EditorBemjsonRoot
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('array', () => {
      const value = [1, 2, 3]
      const schema = {
        type: 'array',
        items: {
          type: 'number',
          format: 'Number',
        },
      }
      return <EditorBemjsonRoot
        value={value}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
    .add('object', () => {
      const value = {
        int: 123,
        float: 123.45,
        string: 'Test string',
        intArray: [0, 1, 2, 3, 4, 5],
      }
      return <EditorBemjsonRoot
        value={value}
        dispatch={action('dispatch')}
      />
    })
}
