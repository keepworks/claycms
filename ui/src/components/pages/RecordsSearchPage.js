import _ from 'lodash'
import gql from 'graphql-tag'
import React, { Fragment, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import ActionList from 'components/ActionList'
import getRecordColumnFields from 'lib/getRecordColumnFields'
import Loader from 'components/internal/Loader'
import ProjectSearchForm from 'components/internal/forms/ProjectSearchForm'
import Record from 'models/Record'
import recordPropertyRenderer from 'lib/recordPropertyRenderer'
import Spacer from 'components/Spacer'
import Table from 'components/internal/dataTable/Table'
import { CellContent } from 'components/internal/typography'
import RECORD_FRAGMENTS from 'fragments/record'

function RecordsSearchPage({ client, match, history }) {
  const [ records, setRecords ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const getRecords = useCallback(async (values) => {
    if (!values.search || !(values.search && values.search.trim())) {
      return
    }

    setLoading(true)
    const { data } = await client.query({
      query: RecordsSearchPage.RECORDS_SEARCH_QUERY,
      variables: {
        projectId: match.params.projectId,
        filter: values.search
      },
      fetchPolicy: 'network-only'
    })
    setLoading(false)
    setRecords(data.records)
  }, [ client, match.params.projectId ])

  const idRenderer = ({ record }) => <CellContent>{record.id}</CellContent>
  const entityLabelRenderer = ({ record }) => <CellContent>{record.entity.label}</CellContent>

  const getTablesData = (recordsFromAPI) => {
    const groupedRecords = _.groupBy(recordsFromAPI, 'entityId')
    const result = {}

    Object.keys(groupedRecords).forEach((id) => {
      const entity = _.get(groupedRecords[id], '[0].entity', {})
      const fields = _.get(groupedRecords[id], '[0].entity.fields', [])
      const parsedRecords = new Record(fields).process(groupedRecords[id])

      const columns = getRecordColumnFields(fields).map(
        field => ({
          dataKey: `traits.${field.name}`,
          label: field.label,
          flexGrow: 1,
          cellRenderer: recordPropertyRenderer(field)
        })
      )

      columns.unshift({
        dataKey: 'entity.name',
        label: 'Entity',
        flexGrow: 1,
        cellRenderer: entityLabelRenderer
      })

      columns.unshift({
        dataKey: 'id',
        label: 'Id',
        flexGrow: 0,
        cellRenderer: idRenderer
      })

      columns.push({
        dataKey: 'actions',
        flexGrow: 0,
        cellRenderer: cell => (
          <ActionList
            record={cell.record}
            actions={[
              {
                icon: 'edit',
                onClick: (clickedRecord) => {
                  const { teamId, projectId } = match.params
                  const { entityId, id: recordId } = clickedRecord
                  const path = `/teams/${teamId}/projects/${projectId}/entities/${entityId}/records/${recordId}/edit`
                  history.push(path)
                }
              }
            ]
          }
          />
        )
      })

      result[id] = {
        entity,
        columns,
        records: parsedRecords
      }
    })

    return result
  }

  const tablesData = getTablesData(records)
  const tablesDataKeys = Object.keys(tablesData)

  return (
    <Fragment>
      <Spacer height={30} />

      <ProjectSearchForm
        onSubmit={getRecords}
      />

      <Spacer height={30} />
      <Loader
        record={{
          loading,
          value: tablesDataKeys
        }}
        emptyView={{
          title: 'results'
        }}
      />
      {tablesDataKeys.map(entityId => (
        <Fragment key={entityId}>
          <Table
            compact
            columns={tablesData[entityId].columns}
            loading={loading}
            records={tablesData[entityId].records}
            selectable={false}
          />
          <Spacer height={20} />
        </Fragment>
      ))}
    </Fragment>
  )
}

RecordsSearchPage.RECORDS_SEARCH_QUERY = gql`
  query RecordsSearchQuery($projectId: ID, $filter: String) {
    records(projectId: $projectId, filter: $filter) {
      id
      entityId
      entity {
        id
        name
        label
        fields {
          ...Record_fields
        }
      }

      properties {
        ...Record_properties
      }
    }
  }

 ${RECORD_FRAGMENTS.fields}
 ${RECORD_FRAGMENTS.properties}
`
RecordsSearchPage = withApollo(RecordsSearchPage)

export default withRouter(RecordsSearchPage)
