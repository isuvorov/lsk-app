import SegmentTable from './SegmentTable';

module.exports = ({ storiesOf, action }) => {
  return storiesOf('SegmentTable', module)
    .add('Simple object', () => {
      const value = {
        int: 123,
        float: 123.45,
        string: 'Test string',
      }
      const schema = {
        type: 'object',
        format: 'form',
      }
      return <SegmentTable
        value={value}
        schema={schema}
      />
    })
    .add('Object', () => {
      const value = {
        int: 123,
        float: 123.45,
        string: 'Test string',
        intArray: [0, 1, 2, 3, 4, 5],
      }
      const schema = {
        type: 'object',
        format: 'form',
      }
      return <SegmentTable
        value={value}
        schema={schema}
      />
    })
    .add('Simple array', () => {
      const value = [0, 1, 2, 3, 4, 5]
      const schema = {
        type: 'array',
        format: 'form',
      }
      return <SegmentTable
        value={value}
        schema={schema}
      />
    })
    .add('Object array', () => {
      const element = {
        int: 123,
        float: 123.45,
        string: 'Test string',
      }
      const value = [element, element, element]
      const schema = {
        type: 'array',
        format: 'form',
      }
      return <SegmentTable
        value={value}
        schema={schema}
      />
    })
}
