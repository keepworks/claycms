import _ from 'lodash'
import { object, string } from 'yup'

import BaseModel from './BaseModel'

class Field extends BaseModel {
  static validateCreate(values) {
    return this.validate(values, [ 'name', 'label' ])
  }

  static validateUpdate(values) {
    return this.validate(values, [ 'name', 'label' ])
  }

  static isColumn(field) {
    return ![ 'key_value', 'array', 'json' ].some(dataType => dataType === field.dataType)
  }

  static isRoot(field) {
    return !field.parentId
  }

  static isVisibleColumn(field) {
    return !(field.settings.visibility === false)
  }

  static process(fields = []) {
    const rootFields = fields.filter(Field.isRoot)

    const processFields = entityFields => entityFields.map((entityField) => {
      const newField = _.omit(entityField, [ '__typename' ])
      const childFields = fields.filter(f => f.parentId === entityField.id)

      if (childFields.length && entityField.dataType === 'key_value') {
        newField.children = processFields(childFields)
      }

      if (childFields.length && entityField.dataType === 'array') {
        const subChildFields = fields.filter(f => f.parentId === childFields[0].id)

        newField.children = processFields(subChildFields)
      }

      return newField
    })

    return processFields(rootFields)
  }
}

Field.schema = object({
  name: string().required(),
  label: string().required()
})

Field.dataTypeList = [
  { value: 'single_line_text', label: 'Single-Line Text' },
  { value: 'multiple_line_text', label: 'Multiple-Line Text' },
  { value: 'number', label: 'Number' },
  { value: 'decimal', label: 'Decimal' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'image', label: 'Image' },
  { value: 'file', label: 'File' },
  { value: 'key_value', label: 'Key-Value' },
  { value: 'array', label: 'Array' },
  { value: 'reference', label: 'Reference' },
  { value: 'color', label: 'Color Picker' },
  { value: 'json', label: 'JSON' }
]

Field.elementTypeList = Field.dataTypeList.filter(({ value }) => value !== 'array')

export default Field
