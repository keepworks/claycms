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

import FIELD_FRAGMENTS from 'fragments/fields'

function FieldsPage({
  confirm,
  createField,
  destroyField,
  entities = [],
  fields = [],
  loading,
  match,
  sortFields,
  history
}) {
  const [ field, isFieldSidePaneOpen, openFieldSidePane, closeFieldSidePane ] = useSidePane()

  const handleFormSubmit = values => createField(values, { onSuccess: () => closeFieldSidePane() })

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
    { icon: 'edit',
      onClick: (clickedField) => {
        const path = `${match.url}/${clickedField.id}/edit`
        history.push(path)
      } },
    {
      icon: 'trash',
      onClick: record => confirm({
        description: `By clicking on Confirm, you will delete the field: ${record.name}`,
        onConfirmClick: () => destroyField(record)
      })
    }
  ]

  if (loading) {
    return <Loader record={{ loading: true }} />
  }

  const processedFields = _.sortBy(Field.process(fields), [ 'position' ])
  const nextPosition = processedFields.length > 0 ? _.last(processedFields).position + 1 : 0
  const formValues = { entityId: match.params.entityId, dataType: 'single_line_text', position: nextPosition, ...field }

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
        formValues={formValues}
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
      ...Field_fields
    }
  }

  ${FIELD_FRAGMENTS.fields}
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
      ...Field_fields
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

  ${FIELD_FRAGMENTS.fields}
`, {
  options: ({ match }) => ({
    variables: {
      entityId: match.params.entityId,
      projectId: match.params.projectId
    }
  })
})(FieldsPage)

export default withConfirmation()(FieldsPage)
