import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'

import Loader from 'components/internal/Loader'
import RecordForm from 'components/internal/forms/RecordForm'
import Record from 'models/Record'
import Spacer from 'components/Spacer'
import { DialogTitle } from 'components/internal/typography'
import { showAlertSuccess } from 'client/methods'
import { withMutation, withQuery } from 'lib/data'
import RECORD_FRAGMENTS from 'fragments/record'

function RecordsEditPage({
  history,
  match,
  fields = [],
  loading,
  record = {},
  updateRecord
}) {
  const handleSubmit = (values) => {
    updateRecord(values, {
      onSuccess: () => {
        const { teamId, projectId, entityId } = match.params
        const path = `/teams/${teamId}/projects/${projectId}/entities/${entityId}/records`
        showAlertSuccess({ message: 'Successfully updated record' })
        history.push(path)
      }
    })
  }

  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  const parsedRecord = new Record(fields).process([ record ])[0]
  const title = `Edit Record #${record.id}`

  return (
    <Fragment>
      <DialogTitle>{title}</DialogTitle>
      <Spacer height={30} />
      <RecordForm
        fields={fields}
        initialValues={parsedRecord}
        onSubmit={handleSubmit}
      />
      <Spacer height={30} />
    </Fragment>
  )
}

RecordsEditPage = injectSheet(({ colors, typography }) => ({
  entityName: {
    ...typography.semibold,
    alignItems: 'center',
    color: colors.text_dark,
    display: 'flex',
    lineHeight: 1
  }
}))(RecordsEditPage)

RecordsEditPage = withMutation(gql`
  mutation UpdateRecordMutation($id: ID!, $input: UpdateRecordInput!) {
    updateRecord(id: $id, input: $input) {
      ...Record_records
    }
  }

  ${RECORD_FRAGMENTS.records}
`, {
  inputFilter: gql`
    fragment UpdateRecordInput on UpdateRecordInput {
      id
      traits
    }
  `
})(RecordsEditPage)

RecordsEditPage = withQuery(gql`
  query GetRecord($recordId: ID!) {
    record(recordId: $recordId) {
      entityId
      ...Record_records
    }    
  }  
  ${RECORD_FRAGMENTS.records}  
`, {
  options: ({ match }) => ({
    variables: {
      recordId: match.params.recordId
    }
  })
})(RecordsEditPage)

RecordsEditPage = withQuery(gql`
  query GetFields($entityId: ID!) {
    fields(entityId: $entityId) {
      ...Record_fields
    }        
  }  
  ${RECORD_FRAGMENTS.fields}
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId
    }
  })
})(RecordsEditPage)

export default RecordsEditPage
