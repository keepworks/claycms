import gql from 'graphql-tag'

const RECORD_FRAGMENTS = {
  fields: gql`
    fragment Record_fields on Field {
      id
      dataType
      validations
      settings
      elementType
      referencedEntityId
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
  `,
  properties: gql`
    fragment Record_properties on Property {
      id
      value
      position
      fieldId
      linkedRecordId
      parentId
      asset {
        id
        fileOriginal
      }
      field {
        id
        position
      }
    }
  `
}

RECORD_FRAGMENTS.records = gql`
  fragment Record_records on Record {
    id
    entityId
    createdAt
    updatedAt

    properties {
      ...Record_properties
    }
  }

  ${RECORD_FRAGMENTS.properties}
`

export default RECORD_FRAGMENTS
