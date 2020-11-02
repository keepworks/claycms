import gql from 'graphql-tag'

const FIELD_FRAGMENTS = {
  fields: gql`
    fragment Field_fields on Field {
      id
      dataType
      validations
      settings
      defaultValue
      elementType
      entityId
      hint
      label
      name
      parentId
      position
      referencedEntityId
    }
  `
}

export default FIELD_FRAGMENTS
