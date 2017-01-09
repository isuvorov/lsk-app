import EditorBemjson from './EditorBemjson';

const bemjson = {
  int: 123,
  float: 123.45,
  string: 'Test string',
  intArray: [0, 1, 2, 3, 4, 5],
}
const largeBemjson = {
  int: 123,
  float: 123.45,
  string: 'Test string',
  intArray: [0, 1, 2, 3, 4, 5],
  intArray2: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray3: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray4: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray5: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  object: {
    int: 123,
    float: 123.45,
    string: 'Test string',
    intArray: [0, 1, 2, 3, 4, 5],
  },
  objectArray: [
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
  ],
}
const project = {
  "_id": "578df9ccf1f2f80c3cdf7b9d",
  "base": "nodejs",
  "name": "bratishka",
  "files": [
    {
      "name": "docker-compose.yml",
      "content": "version: '2'\nservices:\n  app:\n    image: node:5.11.1\n    working_dir: /app/src\n    command: /bin/bash -c \"npm start\"\n    volumes:\n        - ./app:/app/src\n    ports:\n      - 127.0.0.1:8050:8080\n    environment:\n      TOKEN: 139139425:AAFDc-RHpEKxH7etQr92o5MkCmz7HaMKCos"
    }
  ],
  "tasks": [
    {
      "name": "init",
      "content": "git clone git@bitbucket.org:natavts/telegrambot.git app",
      "type": "sh"
    }, {
      "name": "refresh",
      "content": "cd src\ngit pull\ndocker-compose run app npm install --no-progress\ndocker-compose run app npm run build",
      "type": "sh"
    }, {
      "name": "run",
      "content": "docker-compose up",
      "type": "sh"
    }
  ]
}
module.exports = ({ storiesOf, action }) => {
  return storiesOf('EditorBemjson', module)
    .add('Default', () => {
      return <EditorBemjson
        value={bemjson}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('object', () => {
      const value = {
        int: 123,
        float: 123.45,
        string: 'string',
      }
      return <EditorBemjson
        value={value}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('array', () => {
      const value = [1,2,3,4,5]
      return <EditorBemjson
        value={value}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('string', () => {
      const value = "test test"
      return <EditorBemjson
        value={value}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('project', () => {
      const schema = {
        title: 'Проект',
        type: 'object',
        description: 'Docker project',
        required: ['name'],
        additionalProperties: false,
        properties: {
          id: {
            title: 'ID',
            type: 'string',
            format: 'hidden',
          },
          active: {
            type: 'boolean',
          },
          base: {
            type: 'string',
            title: 'Базовый проект',
            description: 'Базовый проект, от которого наследуемся',
          },
          name: {
            type: 'string',
            title: 'Имя проекта',
            description: 'латинские символы нижнего регистра',
          },
          files: {
            type: 'array',
            title: 'Файлы',
            items: {
              type: 'object',
              title: 'Файл',
              properties: {
                name: {
                  type: 'string',
                  title: 'Название',
                  description: 'Название файла',
                },
                content: {
                  type: 'string',
                  title: 'Контент',
                  description: 'Контент файла',
                  format: 'textarea',
                },
              }
            }
          },
          tasks: {
            type: 'array',
            title: 'Задачи',
            items: {
              type: 'object',
              title: 'Задача',
              // description: 'Задача',
              properties: {
                name: {
                  type: 'string',
                  title: 'Название',
                },
                content: {
                  type: 'string',
                  title: 'Контент',
                  // description: 'Контент задачи',
                  format: 'textarea',
                  ui: {
                    format: 'textarea',

                  },
                },
                type: {
                  type: 'string',
                  title: 'Тип',
                  // description: 'Название задачи',
                },
              }
            }
          },
        }
      }
      return <EditorBemjson
        value={project}
        schema={schema}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('largeBemjson', () => {
      return <EditorBemjson
        value={largeBemjson}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('schema', () => {
      const json = {
        "address": {
          "streetAddress": "21 2nd Street",
          "city": "New York"
        },
        "phoneNumber": [
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

      return <EditorBemjson
        value={json}
        schema={schema}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
}
