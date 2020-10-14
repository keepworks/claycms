import _ from 'lodash'
import flat from 'flat'
import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment, useState } from 'react'
import { klona } from 'klona'
import { withApollo } from 'react-apollo'

import ActionList from 'components/ActionList'
import ColorTile from 'components/internal/ColorTile'
import Field from 'models/Field'
import FontIcon from 'components/FontIcon'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import Record from 'models/Record'
import RecordModal from 'components/internal/modals/RecordModal'
import Spacer from 'components/Spacer'
import Table from 'components/internal/dataTable/Table'
import useModal from 'lib/hooks/useModal'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { CellContent } from 'components/internal/typography'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'

const fieldsNormalizedByName = fields => fields
  .reduce((acc, curr) => ({ ...acc, [curr.name]: curr }), {})

const keyValuesArrayToJson = (keyValuesArray) => {
  const flatObject = keyValuesArray
    .filter(v => v)
    .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value || null }), {})

  return flat.unflatten(flatObject, { object: true })
}

const recursiveKeyValuesToJSON = (traits, fields) => {
  const normalizedFields = fieldsNormalizedByName(fields)
  const traitsCopy = klona(traits)

  const helper = (object) => {
    if (_.isObject(object)) {
      Object.keys(object).forEach((key) => {
        if (normalizedFields[key] && normalizedFields[key].dataType === 'json') {
          object[key] = keyValuesArrayToJson(object[key])
        } else if (normalizedFields[key] && normalizedFields[key].dataType === 'array' && normalizedFields[key].elementType === 'json') {
          object[key] = object[key]
            .filter(o => o.value)
            .map(o => ({ ...o, value: keyValuesArrayToJson(o.value) }))
        } else {
          helper(object[key])
        }
      })
    }
  }
  helper(traitsCopy)

  return traitsCopy
}

function RecordsPage({
  confirm,
  createRecord,
  destroyRecord,
  cloneRecord,
  fields,
  loading,
  match,
  records,
  updateRecord,
  client
}) {
  const [
    selectedRecord, isModalOpen, openModal, closeModal
  ] = useModal()

  const [ entities, setEntities ] = useState([])
  const [ entitiesLoading, setEntitiesLoading ] = useState(false)
  const [ recordLoading, setRecordLoading ] = useState(false)

  const getEntities = async (entityId) => {
    setEntitiesLoading(true)
    const { data } = await client.query({
      query: RecordsPage.ENTITIES_QUERY,
      variables: {
        entityId
      },
      fetchPolicy: 'network-only'
    })

    const newEntities = [ ...entities, ...data.referencedEntities ]

    setEntities(newEntities)
    setEntitiesLoading(false)
    return newEntities
  }

  const getRecord = async (recordId) => {
    setRecordLoading(true)
    const { data: { record } } = await client.query({
      query: RecordsPage.RECORD_QUERY,
      variables: {
        recordId
      },
      fetchPolicy: 'network-only'
    })

    const newEntities = entities
      .map((entity) => {
        if (entity.id === record.entityId) {
          entity.records.push(record)
        }

        return entity
      })

    setEntities(newEntities)
    setRecordLoading(false)
    return newEntities
  }

  const handleFormSubmit = (values) => {
    const traits = recursiveKeyValuesToJSON(values.traits, fields)

    if (values.id) {
      return updateRecord({ ...values, traits }, {
        onSuccess: () => {
          setEntities([]) // Reset entities so that they are refetched when modal reopens
          closeModal()
        }
      })
    }

    return createRecord({ ...values, traits }, { onSuccess: () => closeModal() })
  }

  const makePropertyRenderer = field => ({ record }) => {
    let isValid = false
    const value = record.traits[field.name]

    if (_.isString(value) || _.isNumber(value)) {
      isValid = true
    }

    if (field.dataType === 'boolean') {
      const isActive = typeof value === 'boolean' ? value : value === 't'

      return (
        <CellContent>
          {isActive ? (
            <FontIcon name="round-tick" size="small" />
          ) : (
            <FontIcon name="round-remove" size="small" />
          )}
        </CellContent>
      )
    }

    if (field.dataType === 'color' && value) {
      return <CellContent>{<ColorTile color={value} />}</CellContent>
    }

    return <CellContent>{isValid ? value : '-'}</CellContent>
  }

  const idRenderer = ({ record }) => <CellContent>{record.id}</CellContent>

  const columnFields = _.sortBy((fields || []).filter(Field.isRoot).filter(Field.isColumn).filter(Field.isVisibleColumn), [ 'position' ])

  const columns = columnFields.map(field => ({
    dataKey: `traits.${field.name}`,
    label: field.label,
    flexGrow: 1,
    cellRenderer: makePropertyRenderer(field)
  }))

  columns.unshift({
    dataKey: 'id',
    label: 'Id',
    flexGrow: 0,
    cellRenderer: idRenderer
  })

  columns.push({
    dataKey: 'actions',
    flexGrow: 0,
    cellRenderer: ({ record }) => (
      <ActionList
        record={record}
        actions={[
          { icon: 'edit', onClick: clickedRecord => openModal(clickedRecord) },
          {
            icon: 'trash',
            onClick: clickedRecord => confirm({
              description: 'By clicking on Confirm, you will delete the record.',
              onConfirmClick: () => destroyRecord(clickedRecord)
            })
          },
          {
            icon: 'copy',
            onClick: clickedRecord => confirm({
              description: 'By clicking on Confirm, you will duplicate the record.',
              onConfirmClick: () => cloneRecord(clickedRecord)
            })
          }
        ]}
      />
    )
  })

  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  // TODO: Move the method process from model?
  const processedRecords = new Record(fields || []).process(records || [])

  const sortField = columnFields[0] ? `traits.${columnFields[0].name}` : 'id'
  const sortedRecords = _.sortBy(processedRecords, [ sortField ])

  return (
    <Fragment>
      <IconButton icon="plus" onClick={() => openModal()} />
      <Spacer height={30} />

      <Loader
        record={{
          loading,
          value: sortedRecords
        }}
        emptyView={{
          buttonLabel: 'Create new record',
          title: 'records',
          onButtonClick: () => openModal()
        }}
      />

      <Table
        compact
        columns={columns}
        loading={loading}
        records={sortedRecords}
        selectable={false}
      />

      <RecordModal
        isOpen={isModalOpen}
        fields={fields || []}
        entities={entities}
        getEntities={getEntities}
        entitiesLoading={entitiesLoading}
        recordLoading={recordLoading}
        formValues={{ entityId: match.params.entityId, ...selectedRecord }}
        onFormSubmit={handleFormSubmit}
        onRequestClose={closeModal}
        getRecord={getRecord}
      />
    </Fragment>
  )
}

RecordsPage = injectSheet(({ colors, typography }) => ({
  entityName: {
    ...typography.semibold,

    alignItems: 'center',
    color: colors.text_dark,
    display: 'flex',
    lineHeight: 1
  }
}))(RecordsPage)

RecordsPage.fragments = {
  fields: gql`
    fragment RecordsPage_fields on Field {
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
    fragment RecordsPage_properties on Property {
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

RecordsPage.fragments.records = gql`
  fragment RecordsPage_records on Record {
    id
    entityId
    createdAt
    updatedAt

    properties {
      ...RecordsPage_properties
    }
  }

  ${RecordsPage.fragments.properties}
`

RecordsPage = withMutation(gql`
  mutation CreateRecordMutation($input: CreateRecordInput!) {
    createRecord(input: $input) {
      ...RecordsPage_records
    }
  }

  ${RecordsPage.fragments.records}
`, {
  inputFilter: gql`
    fragment CreateRecordInput on CreateRecordInput {
      entityId
      traits
    }
  `,
  mode: MutationResponseModes.APPEND
})(RecordsPage)

RecordsPage = withMutation(gql`
  mutation UpdateRecordMutation($id: ID!, $input: UpdateRecordInput!) {
    updateRecord(id: $id, input: $input) {
      ...RecordsPage_records
    }
  }

  ${RecordsPage.fragments.records}
`, {
  inputFilter: gql`
    fragment UpdateRecordInput on UpdateRecordInput {
      id
      traits
    }
  `
})(RecordsPage)

RecordsPage = withMutation(gql`
  mutation CloneRecordMutation($id: ID!) {
    cloneRecord(id: $id) {
      ...RecordsPage_records
    }
  }
  
  ${RecordsPage.fragments.records}
`, {
  mode: MutationResponseModes.APPEND,
  successAlert: () => ({
    message: 'Successfully duplicated record'
  })
})(RecordsPage)

RecordsPage = withMutation(gql`
  mutation DestroyRecordMutation($id: ID!) {
    destroyRecord(id: $id) {
      id
    }
  }
`, {
  optimistic: { mode: OptimisticResponseModes.DESTROY, response: { __typename: 'Record' } },
  mode: MutationResponseModes.DELETE,
  successAlert: () => ({
    message: 'Successfully deleted record'
  })
})(RecordsPage)

RecordsPage = withQuery(gql`
  query RecordsPageQuery($entityId: ID!) {
    records(entityId: $entityId) {
      ...RecordsPage_records
    }

    entity(id: $entityId) {
      id
      label
      name
    }

    fields(entityId: $entityId) {
      ...RecordsPage_fields
    }
  }

  ${RecordsPage.fragments.records}
  ${RecordsPage.fragments.fields}
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId
    }
  })
})(RecordsPage)

RecordsPage.ENTITIES_QUERY = gql`
  query RecordsPageEntitiesQuery($entityId: ID!) {
    referencedEntities(entityId: $entityId) {
      id
      label
      name
      label
      parentId

      fields {
        ...RecordsPage_fields
      }

      records {
        ...RecordsPage_records
      }
    }
  }

  ${RecordsPage.fragments.records}
  ${RecordsPage.fragments.fields}
`

RecordsPage.RECORD_QUERY = gql`
  query RecordsPageRecordQuery($recordId: ID!) {
    record(recordId: $recordId) {
      entityId

      ...RecordsPage_records
    }
  }

  ${RecordsPage.fragments.records}
`
RecordsPage = withApollo(RecordsPage)

export default withConfirmation()(RecordsPage)
