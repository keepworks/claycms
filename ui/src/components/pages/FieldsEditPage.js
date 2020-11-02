import _ from 'lodash'
import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'

import FieldForm from 'components/internal/forms/FieldForm'
import Loader from 'components/internal/Loader'
import Spacer from 'components/Spacer'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { DialogTitle } from 'components/internal/typography'
import { Field } from 'models'
import { MutationResponseModes, withMutation, withQuery } from 'lib/data'
import { showAlertSuccess } from 'client/methods'
import FIELD_FRAGMENTS from 'fragments/fields'

function FieldsEditPage({
  entities = [],
  fields = [],
  loading,
  match,
  updateField,
  history
}) {
  const handleFormSubmit = values => updateField(values, { onSuccess: () => {
    const { teamId, projectId, entityId } = match.params
    const path = `/teams/${teamId}/projects/${projectId}/entities/${entityId}/fields`
    showAlertSuccess({ message: 'Successfully updated field' })
    history.push(path)
  } })

  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  const processedFields = Field.process(fields)
  const field = processedFields.find(f => f.id === match.params.fieldId)
  const title = `Edit Field #${field.label}`

  return (
    <Fragment>
      <DialogTitle>{title}</DialogTitle>
      <Spacer height={30} />
      <FieldForm
        initialValues={field}
        onSubmit={handleFormSubmit}
        entities={entities}
      />
      <Spacer height={30} />
    </Fragment>
  )
}

FieldsEditPage = injectSheet(({ colors, typography }) => ({
  entityName: {
    ...typography.semibold,

    alignItems: 'center',
    color: colors.text_dark,
    display: 'flex',
    lineHeight: 1
  }
}))(FieldsEditPage)

FieldsEditPage = withMutation(gql`
  mutation UpdateFieldMutation($id: ID!, $input: UpdateFieldInput!) {
    updateField(id: $id, input: $input) {
      ...Field_fields
    }
  }

  ${FIELD_FRAGMENTS.fields}
`, {
  inputFilter: gql`
    fragment UpdateFieldInput on UpdateFieldInput {
      id
      children
      dataType
      validations
      settings
      defaultValue
      elementType
      hint
      label
      name
      position
      referencedEntityId
    }
  `,
  mode: MutationResponseModes.CUSTOM,
  updateData: ({ cachedData, responseRecords }) => {
    const currentRecords = cachedData.fields
    cachedData.fields = _.unionWith(currentRecords, responseRecords, _.isEqual)
  }
})(FieldsEditPage)

FieldsEditPage = withQuery(gql`
  query GetFieldsAndEntities($entityId: ID!, $projectId: ID!) {
    fields(entityId: $entityId) {
      ...Field_fields
    }

    entities(projectId: $projectId) {
      id
      label
      name
    }
  }

  ${FIELD_FRAGMENTS.fields}
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId,
      projectId: match.params.projectId
    }
  })
})(FieldsEditPage)

export default withConfirmation()(FieldsEditPage)
