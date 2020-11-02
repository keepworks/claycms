import _ from 'lodash'
import gql from 'graphql-tag'
import React, { Fragment, useState } from 'react'
import { withApollo } from 'react-apollo'

import Loader from 'components/internal/Loader'
import ProjectSearchForm from 'components/internal/forms/ProjectSearchForm'
import Spacer from 'components/Spacer'
import Tag from 'components/internal/Tag'
import Table from 'components/internal/dataTable/Table'
import { CellLabel, CellText, CellTitle } from 'components/internal/typography'
import { Field } from 'models'

import FIELD_FRAGMENTS from 'fragments/fields'

function FieldsSearchPage({ client, match, history }) {
  const [ searchData, setSearchData ] = useState({})
  const [ loading, setLoading ] = useState(false)

  const getFields = async (values) => {
    if (!values.search || !(values.search && values.search.trim())) {
      return
    }
    setLoading(true)
    const { data } = await client.query({
      query: FieldsSearchPage.FIELDS_SEARCH_QUERY,
      variables: {
        projectId: match.params.projectId,
        filter: values.search
      },
      fetchPolicy: 'network-only'
    })

    setLoading(false)
    setSearchData(data)
  }

  const entityNameRenderer = ({ record }) => (
    <Fragment>
      <CellLabel>Entity</CellLabel>
      <CellTitle>{record.entity.label}</CellTitle>
    </Fragment>
  )

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

  const actions = [
    { icon: 'edit',
      onClick: (clickedField) => {
        const { teamId, projectId } = match.params
        const { entityId, id: fieldId } = clickedField
        const path = `/teams/${teamId}/projects/${projectId}/entities/${entityId}/fields/${fieldId}/edit`
        history.push(path)
      } }
  ]

  const columns = [
    { dataKey: 'label', bordered: false, flexGrow: 1, cellRenderer: labelRenderer },
    { dataKey: 'entity.name', bordered: false, flexGrow: 1, cellRenderer: entityNameRenderer },
    { dataKey: 'name', flexGrow: 1, cellRenderer: nameRenderer },
    { dataKey: 'dataType', flexGrow: 1, cellRenderer: dataTypeRenderer }
  ]

  const processedFields = _.groupBy(_.sortBy(searchData.fields, [ 'position' ]), 'entityId')

  const processedFieldsKeys = Object.keys(processedFields)
  return (
    <Fragment>
      <Spacer height={30} />

      <ProjectSearchForm
        onSubmit={getFields}
      />

      <Spacer height={30} />
      <Loader
        record={{
          loading,
          value: processedFieldsKeys
        }}
        emptyView={{
          title: 'results'
        }}
      />
      {processedFieldsKeys.map(key => (
        <Fragment key={key}>
          <Table
            actions={actions}
            columns={columns}
            loading={loading}
            records={processedFields[key]}
            selectable={false}
          />
          <Spacer height={20} />
        </Fragment>
      ))}
    </Fragment>
  )
}

FieldsSearchPage.FIELDS_SEARCH_QUERY = gql`
  query FieldsSearchQuery($projectId: ID, $filter: String) {
    fields(projectId: $projectId, filter: $filter) {
      ...Field_fields
      entity {
        id
        label
        name  
      }
    }    
  }

  ${FIELD_FRAGMENTS.fields}
`

FieldsSearchPage = withApollo(FieldsSearchPage)

export default FieldsSearchPage
