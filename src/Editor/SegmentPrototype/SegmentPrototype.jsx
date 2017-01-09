import { Component, PropTypes } from 'react'
import _ from 'lodash'
import { autobind, debounce } from 'core-decorators'

function equal(a, b){
  return JSON.stringify(a) === JSON.stringify(b)
}



export default class SegmentPrototype extends Component {

  static propTypes = {
    schema: PropTypes.object,
    value: PropTypes.any.isRequired,
    path: PropTypes.array,
    dispatch: PropTypes.func,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(!(!equal(nextState, this.state) || !equal(nextProps, this.props))) return false
    // console.log('nextProps', nextProps, 'this.props', this.props);
    return true
  }


  isHashRoot() {
    return this.getPath()[0] === '#' && this.getPath().length === 1 || this.getPath().length === 0
  }
  // For child methods
  getChildKey() {
    return this.props.path[this.props.path.length - 1]
  }
  getChildValue(key) {
    return this.props.value[key]
  }
  getChildSchema(key) {
    if (!this.props.schema) return null
    const schema = this.props.schema
    if (key === null) return schema
    if (schema.properties) {
      return schema.properties[key]
    }
    if (schema.items) {
      return schema.items
    }
    return null
  }
  getParentPath() {
    return this.props.path.slice(0, -1)
  }
  getChildPath(...keys) {
    const path = this.props.path ? _.clone(this.props.path) : []
    keys.forEach(key => path.push(key))
    return path
  }
  getChildProps2(key) {
    return {
      // path,
      // schema,
      // value,
      // parent: this.props,
      dispatch: this.props.dispatch,
      // ...this.getSpecialActions(key),
      // ...this.getActions(key),
      // specialActions: this.getSpecialActions(key),
      // actions: this.getActions(key),
      parentLength: _.isArray(this.props.value) ? this.props.value.length : null,
      rootSchema: this.props.rootSchema,
      path: this.getChildPath(key),
      value: this.getChildValue(key),
      schema: this.getChildSchema(key),
    }
  }
  getChild(key) {
    return new SegmentPrototype(this.getChildProps2(key))
  }

  // For node methods
  getParentValueType() {
    return typeof this.getChildKey() === 'number' ? 'array' : 'object'
  }
  getValueType() {
    const value = this.props.value
    if (_.isArray(value)) {
      return 'array'
    } else if (_.isPlainObject(value)) {
      return 'object'
    }
    return 'simple'
  }
  getType() {
    const schema = this.getSchema()
    if (!schema) return null
    return schema.type
  }
  getSample(schema) {
    let value
    if (!schema || !schema.type) return null
    if (schema.type === 'object') {
      value = {}
      _.forEach(schema.properties || {}, (val, key) => {
        value[key] = this.getSample(val)
      })
      return value
    }
    if (schema.type === 'array') {
      return [this.getSample(schema.items)]
    }
    if (schema.type === 'number') {
      return 0
    }
    if (schema.type === 'string') {
      return ''
    }
    return null
  }
  getFormat() {
    const schema = this.props.schema
    if (schema && schema.format) return schema.format
    switch (this.getValueType()) {
      case 'array':
      case 'object':
        return 'form'
      default:
        return 'simple'
    }
  }
  getTitle() {
    const schema = this.props.schema
    if (schema && schema.title) return schema.title
    return this.getChildKey()
  }
  getDescription() {
    const schema = this.props.schema
    if (schema && schema.description) return schema.description
    return null
  }

  isComplexType(key) {
    return this.getValueType(key) !== 'simple'
  }

  @autobind
  actionSet(value) {
    this.props.dispatch({
      type: 'editorSet',
      path: this.props.path,
      value,
    });
  }

  @autobind
  // @debounce(100)
  actionSetDebounced(value) {
    // console.log('actionSetDebounced');
    this.props.dispatch({
      type: 'editorSet',
      path: this.props.path,
      value,
    });
  }
  @autobind
  actionPush() {
    const key = this.props.value.length
    const schema = this.getChildSchema(key)
    this.props.dispatch({
      type: 'editorSet',
      path: this.getChildPath(key),
      value: this.getSample(schema),
    });
  }
  @autobind
  actionAddProp(pack) {
    const key = pack.key
    const schema = this.getChildSchema(key)
    const value = pack.value || this.getSample(schema)
    this.props.dispatch({
      type: 'editorSet',
      path: this.getChildPath(key),
      value,
    });
  }
  @autobind
  actionUp() {
    const key = this.getChildKey()
    const path = this.getParentPath()
    this.props.dispatch({
      type: 'editorSwap',
      path: [...path, key],
      pathTo: [...path, key - 1],
    })
  }
  @autobind
  actionDown() {
    const key = this.getChildKey()
    const path = this.getParentPath()
    this.props.dispatch({
      type: 'editorSwap',
      path: [...path, key],
      pathTo: [...path, key + 1],
      // path: this.getPath(key),
      // pathTo: this.getPath(key + 1),
    })
  }
  @autobind
  actionRemove() {
    this.props.dispatch({
      type: 'editorRemove',
      path: this.props.path,
    });
  }
  getPath(...keys) {
    const path = this.props.path ? _.clone(this.props.path) : []
    keys.forEach(key => path.push(key))
    return path
  }

  getValue(key = null) {
    if (key === null) return this.props.value
    return this.props.value[key]
  }

  getSuperType(value = this.props.value) {
    // const value = this.props.value
    if (_.isArray(value)) {
      return 'array'
    } else if (_.isPlainObject(value)) {
      return 'object'
    }
    return 'simple'
  }

  getSchema(key = null) {
    if (!this.props.schema) return null
    const schema = this.props.schema
    if (key !== null) {
      if (schema.properties) {
        return schema.properties[key]
      }
      if (schema.items) {
        return schema.items
      }
      return null
    }
    return schema
  }


}
