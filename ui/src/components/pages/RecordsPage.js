import _ from 'lodash'
import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'
import { withApollo } from 'react-apollo'

import ActionList from 'components/ActionList'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import Record from 'models/Record'
import RecordModal from 'components/internal/modals/RecordModal'
import Spacer from 'components/Spacer'
import Table from 'components/internal/dataTable/Table'
import useModal from 'lib/hooks/useModal'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { CellContent } from 'components/internal/typography'
import getRecordColumnFields from 'lib/getRecordColumnFields'
import recordPropertyRenderer from 'lib/recordPropertyRenderer'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'
import RECORD_FRAGMENTS from 'fragments/record'

function RecordsPage({
  confirm,
  createRecord,
  destroyRecord,
  cloneRecord,
  fields,
  loading,
  match,
  records,
  history
}) {
  const [
    selectedRecord, isModalOpen, openModal, closeModal
  ] = useModal()

  const handleSubmit = (values) => {
    createRecord(values, { onSuccess: () => { closeModal() } })
  }

  const idRenderer = ({ record }) => <CellContent>{record.id}</CellContent>

  const columnFields = getRecordColumnFields(fields)

  const columns = columnFields.map(field => ({
    dataKey: `traits.${field.name}`,
    label: field.label,
    flexGrow: 1,
    cellRenderer: recordPropertyRenderer(field)
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
          {
            icon: 'edit',
            onClick: (clickedRecord) => {
              const path = `${match.url}/${clickedRecord.id}/edit`
              history.push(path)
            }
          },
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
        formValues={{ entityId: match.params.entityId, ...selectedRecord }}
        onRequestClose={closeModal}
        closeModal={closeModal}
        onSubmit={handleSubmit}
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

RecordsPage = withMutation(gql`
  mutation CreateRecordMutation($input: CreateRecordInput!) {
    createRecord(input: $input) {
      ...Record_records
    }
  }

  ${RECORD_FRAGMENTS.records}
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

RecordsPage = withMutation(gql`
  mutation CloneRecordMutation($id: ID!) {
    cloneRecord(id: $id) {
      ...Record_records
    }
  }
  
  ${RECORD_FRAGMENTS.records}
`, {
  mode: MutationResponseModes.APPEND,
  successAlert: () => ({
    message: 'Successfully duplicated record'
  })
})(RecordsPage)

RecordsPage = withQuery(gql`
  query RecordsPageQuery($entityId: ID!) {
    records(entityId: $entityId) {
      ...Record_records
    }

    entity(id: $entityId) {
      id
      label
      name
    }

    fields(entityId: $entityId) {
      ...Record_fields
    }
  }

  ${RECORD_FRAGMENTS.records}
  ${RECORD_FRAGMENTS.fields}
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId
    }
  })
})(RecordsPage)

RecordsPage = withApollo(RecordsPage)

export default withConfirmation()(RecordsPage)
