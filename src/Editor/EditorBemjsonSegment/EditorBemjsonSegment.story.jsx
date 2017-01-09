import EditorBemjsonSegment from './EditorBemjsonSegment';

module.exports = ({ storiesOf, action }) => {
  return storiesOf('EditorBemjsonSegment', module)
    .add('Default', () => {
      const value = {
        int: 123,
        float: 123.45,
        string: 'Test string',
        intArray: [0, 1, 2, 3, 4, 5],
      }
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('Default2', () => {
      const obj = {
        int: 123,
        float: 123.45,
        string: 'Test string',
      }
      const value = {
        int: 123,
        float: 123.45,
        string: 'Test string',
        subObject: obj,
        intArray: [0, 1, 2, 3, 4, 5],
        objectsArray: [obj, obj, obj],
      }
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })

    .add('int', () => {
      const value = 123
      const schema = {
        title: 'Число',
        type: 'number',
        format: 'number',
      }
      return <EditorBemjsonSegment
        value={value}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
    .add('int controls', () => {
      const value = 123
      const schema = {
        title: 'Число',
        type: 'number',
      }
      return <EditorBemjsonSegment
        value={value}
        schema={schema}
        controls={true}
        dispatch={action('dispatch')}
      />
    })

    .add('string', () => {
      const value = 'string'
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('object string', () => {
      const value = {string: 'string'}
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('array string', () => {
      const value = ['string1', 'string2', 'string3',]
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('array string element', () => {
      const value = 'string1'
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('string textarea', () => {
      const value = 'textarea\n\ttextarea\n\t\ttextarea'
      const schema = {
        type: 'string',
        format: 'textarea',
      }
      return <EditorBemjsonSegment
        value={value}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
    .add('object textarea', () => {
      const value = {
        textarea: 'textarea\n\ttextarea\n\t\ttextarea',
      }
      const schema = {
        type: 'object',
        properties: {
          textarea: {
            type: 'string',
            format: 'textarea',
          },
        },
      }
      return <EditorBemjsonSegment
        value={value}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
    .add('array of int', () => {
      const value = [
        1,
        'textarea2\n\ttextarea2\n\t\ttextarea2',
      ]
      const schema = {
        type: 'array',
        items: {
          type: 'string',
          format: 'textarea',
        },
      }
      return <EditorBemjsonSegment
        value={value}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
    .add('array of textarea', () => {
      const value = [
        'textarea\n\ttextarea\n\t\ttextarea',
        'textarea2\n\ttextarea2\n\t\ttextarea2',
      ]
      const schema = {
        type: 'array',
        items: {
          type: 'string',
          format: 'textarea',
        }
      }
      return <EditorBemjsonSegment
        value={value}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
    .add('schema', () => {
      const json = {
        "textarea": "TEXT TEXT TEXT",
        "address": {
          "streetAddress": "21 2nd Street",
          "city": "New York"
        },
        "phoneNumber": [
					{
            "location": "home",
            "code": 44
          },
					{
            "location": "home",
            "code": 44
          },
					{
            "location": "home",
            "code": 44
          },
					{
            "location": "home",
            "code": 44
          },
					{
            "location": "home",
            "code": 44
          }
        ]
      }
      const schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "color": {
            "type": "string",
            "format": "color"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "textarea": {
            "type": "string",
            "format": "textarea"
          },
          "markdown": {
            "type": "string",
            "format": "markdown"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "js": {
            "type": "string",
            "format": "js"
          },
          "yaml": {
            "type": "string",
            "format": "yaml"
          },
          "checkbox": {
            "type": "boolean",
            "format": "checkbox"
          },
          "table": {
            "type": "array",
            "format": "table",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                }
              }
            }
          },
          "grid": {
            "type": "object",
            "properties": {
              "name1": { "type": "string" },
              "name2": { "type": "string" },
              "name3": { "type": "string" },
            },
            "format": "grid"
          },
          "address": {
            "type": "object",
            "properties": {
              "streetAddress": {
                "type": "string"
              },
              "city": {
                "type": "string"
              }
            },
            "required": [
              "streetAddress",
              "city"
            ]
          },
          "phoneNumber": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string"
                },
                "code": {
                  "type": "integer"
                }
              },
              "required": [
                "location",
                "code"
              ]
            }
          }
        },
        "required": [
          "address",
          "phoneNumber"
        ]
      }
      return <EditorBemjsonSegment
        value={json}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
}
