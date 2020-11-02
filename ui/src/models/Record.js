import _ from 'lodash'
import { object, mixed } from 'yup'

import BaseModel from './BaseModel'
import Field from './Field'

class Record extends BaseModel {
  constructor(fields = []) {
    super()

    this.fieldsMapping = fields.reduce((mapping, field) => {
      mapping[field.id] = field

      return mapping
    }, {})
  }

  summarize = (record, entity) => {
    const baseText = `${entity.label} - ID: ${record.id}`
    const rootProperties = _.sortBy(record.properties, [ 'field.position' ]).filter(p => !p.parentId)

    const values = rootProperties.map((property) => {
      const field = this.fieldsMapping[property.fieldId]

      if (Field.isColumn(field)) {
        return `${field.label}: ${property.value}`
      }

      return null
    })

    const contentText = _.compact(values).join(' / ')

    return `${baseText} - ${contentText}`
  }

  process = records => (records || []).map((record) => {
    const traits = {}
    const { properties } = record
    const rootProperties = properties.filter(p => !p.parentId)
    rootProperties.forEach((property) => {
      const field = this.fieldsMapping[property.fieldId]

      if (field) {
        traits[field.name] = this.propertyValue(property, properties)
      }
    })

    return {
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      traits
    }
  })

  propertyValue = (property, properties) => {
    const { dataType } = this.fieldsMapping[property.fieldId] || {}
    const childProperties = properties.filter(p => p.parentId === property.id)

    if (dataType === 'key_value') {
      return childProperties.reduce((processedValue, child) => {
        const field = this.fieldsMapping[child.fieldId]
        if (field) {
          processedValue[field.name] = this.propertyValue(child, properties)
        }

        return processedValue
      }, {})
    }

    if (dataType === 'array') {
      return _.sortBy(childProperties, [ 'position' ])
        .map((child) => {
          const field = this.fieldsMapping[child.fieldId]

          if (field.dataType === 'reference') {
            return this.propertyValue(child, properties)
          }

          return {
            id: child.id,
            position: child.position,
            value: this.propertyValue(child, properties)
          }
        })
    }

    if (dataType === 'reference') {
      return {
        id: property.linkedRecordId
      }
    }

    if (dataType === 'json') {
      return JSON.parse(property.value)
    }

    if (dataType === 'image' || dataType === 'file') {
      return property.asset && property.asset.fileOriginal
    }

    return property.value
  }

  static summarizeKeyValuePair = (childFields, values) => {
    const baseText = ''

    if (!values) return baseText

    const summarizedValues = childFields.map((field) => {
      if (Field.isColumn(field)) {
        return values[field.name] ? `${field.label}: ${values[field.name]}` : null
      }

      return null
    })

    const containsAllNonPrimitive = summarizedValues.every(value => value === null)

    return containsAllNonPrimitive ? baseText : _.compact(summarizedValues).join(' • ')
  }

  static validateCreate = (fields, entities) => (
    values => BaseModel.validateWithSchema(values, Record.schema(fields, entities))
  )
}

const traitsSchema = (fields, entities = []) => object(
  fields.reduce((acc, field) => {
    if (field.dataType === 'reference') {
      const referenceEntity = entities.filter(entity => entity.id === field.referencedEntityId)[0]

      if (referenceEntity) {
        return { ...acc, [field.name]: Record.schema(referenceEntity.fields, entities, true) }
      }
    }

    if (!field.parentId && field.validations.presence) {
      return { ...acc, [field.name]: field.dataType !== 'array' && mixed().required() }
    }

    return acc
  }, {})
)

Record.schema = (fields, entities, required = false) => object().shape({
  traits: required
    ? traitsSchema(fields, entities)
    : traitsSchema(fields, entities).default(null).nullable()
}).default(object().shape({ traits: {} }))

export default Record
