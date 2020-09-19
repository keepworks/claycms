import _ from 'lodash'
import gql from 'graphql-tag'
import injectSheet from 'react-jss'
import React, { Fragment } from 'react'

import FieldSidePane from 'components/internal/sidePanes/FieldSidePane'
import IconButton from 'components/internal/buttons/IconButton'
import Loader from 'components/internal/Loader'
import Spacer from 'components/Spacer'
import Table from 'components/internal/dataTable/Table'
import Tag from 'components/internal/Tag'
import useSidePane from 'lib/hooks/useSidePane'
import withConfirmation from 'components/internal/decorators/withConfirmation'
import { Field } from 'models'
import { MutationResponseModes, OptimisticResponseModes, withMutation, withQuery } from 'lib/data'
import { CellLabel, CellText, CellTitle } from 'components/internal/typography'

function FieldsPage({
  confirm,
  createField,
  destroyField,
  entities,
  fields,
  loading,
  match,
  sortFields,
  updateField
}) {
  const [ field, isFieldSidePaneOpen, openFieldSidePane, closeFieldSidePane ] = useSidePane()

  const rootFields = (fields || []).filter(Field.isRoot)

  const handleFormSubmit = (values) => {
    if (values.id) {
      return updateField(values, { onSuccess: () => closeFieldSidePane() })
    }

    return createField(values, { onSuccess: () => closeFieldSidePane() })
  }

  const processFields = (entityFields = []) => entityFields.map((entityField) => {
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

  const labelRenderer = ({ record: { label } }) => (
    <Fragment>
      <CellLabel>Label</CellLabel>
      <CellTitle>{label}</CellTitle>
    </Fragment>
  )

  const nameRenderer = ({ record: { name } }) => (
    <Fragment>
      <CellLabel>Name</CellLabel>
      <CellText>{name}</CellText>
    </Fragment>
  )

  const dataTypeRenderer = ({ record: { dataType } }) => (
    <Tag>{Field.dataTypeList.find(dt => dt.value === dataType).label}</Tag>
  )

  const columns = [
    { dataKey: 'label', bordered: false, flexGrow: 1, cellRenderer: labelRenderer },
    { dataKey: 'name', flexGrow: 1, cellRenderer: nameRenderer },
    { dataKey: 'dataType', flexGrow: 1, cellRenderer: dataTypeRenderer }
  ]

  const actions = [
    { icon: 'edit', onClick: record => openFieldSidePane(record) },
    {
      icon: 'trash',
      onClick: record => confirm({
        description: `By clicking on Confirm, you will delete the field: ${record.name}`,
        onConfirmClick: () => destroyField(record)
      })
    }
  ]

  const processedFields = _.sortBy(processFields(rootFields), [ 'position' ])
  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  return (
    <Fragment>
      <IconButton icon="plus" onClick={() => openFieldSidePane()} />
      <Spacer height={30} />

      <Loader
        record={{ value: processedFields }}
        emptyView={{
          buttonLabel: 'Create new field',
          title: 'fields',
          onButtonClick: () => openFieldSidePane()
        }}
      />

      <Table
        actions={actions}
        columns={columns}
        loading={loading}
        records={processedFields}
        selectable={false}
        sortable
        onSortingChange={sortedFields => sortFields({
          fields: sortedFields.map((f, index) => ({ id: f.id, position: index }))
        })}
      />

      <FieldSidePane
        isOpen={isFieldSidePaneOpen}
        formValues={{ entityId: match.params.entityId, dataType: 'single_line_text', position: processedFields.length, ...field }}
        entities={entities}
        onFormSubmit={handleFormSubmit}
        onRequestClose={closeFieldSidePane}
      />
    </Fragment>
  )
}

FieldsPage = injectSheet(({ colors, typography }) => ({
  entityName: {
    ...typography.semibold,

    alignItems: 'center',
    color: colors.text_dark,
    display: 'flex',
    lineHeight: 1
  }
}))(FieldsPage)

FieldsPage.fragments = {
  fields: gql`
    fragment FieldsPage_fields on Field {
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

FieldsPage = withMutation(gql`
  mutation SortFieldsMutation($input: SortFieldsInput!) {
    sortFields(input: $input) {
      id
      name
      position
    }
  }
`)(FieldsPage)

FieldsPage = withMutation(gql`
  mutation CreateFieldMutation($input: CreateFieldInput!) {
    createField(input: $input) {
      ...FieldsPage_fields
    }
  }

  ${FieldsPage.fragments.fields}
`, {
  inputFilter: gql`
    fragment CreateFieldInput on CreateFieldInput {
      dataType
      defaultValue
      elementType
      validations
      settings
      entityId
      hint
      label
      name
      position
      referencedEntityId
      children
    }
  `,
  mode: MutationResponseModes.APPEND
})(FieldsPage)

FieldsPage = withMutation(gql`
  mutation UpdateFieldMutation($id: ID!, $input: UpdateFieldInput!) {
    updateField(id: $id, input: $input) {
      ...FieldsPage_fields
    }
  }

  ${FieldsPage.fragments.fields}
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
})(FieldsPage)

FieldsPage = withMutation(gql`
  mutation DestroyFieldMutation($id: ID!) {
    destroyField(id: $id) {
      id
    }
  }
`, {
  optimistic: { mode: OptimisticResponseModes.DESTROY, response: { __typename: 'Field' } },
  mode: MutationResponseModes.DELETE,
  successAlert: ({ input: { name } }) => ({
    message: `Successfully deleted field: ${name}`
  })
})(FieldsPage)

FieldsPage = withQuery(gql`
  query FieldsPageQuery($entityId: ID!, $projectId: ID!) {
    fields(entityId: $entityId) {
      ...FieldsPage_fields
    }

    entity(id: $entityId) {
      id
      label
      name
    }

    entities(projectId: $projectId) {
      id
      label
      name
    }
  }

  ${FieldsPage.fragments.fields}
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId,
      projectId: match.params.projectId
    }
  })
})(FieldsPage)

export default withConfirmation()(FieldsPage)
