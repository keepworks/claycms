import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'

import Column from 'components/internal/dataTable/Column'
import Row from 'components/internal/dataTable/Row'

function DataTable({
  columns,
  compact,
  loading,
  onSelectionChange,
  onSortingChange,
  sortable,
  records,
  ...rest
}) {
  const [ selectedIds, setSelectedIds ] = useState([])
  const [ sortedRecords, setSortedRecords ] = useState([])

  useEffect(() => {
    setSortedRecords(records || [])
  }, [ records ])

  const updateSelection = (ids) => {
    setSelectedIds(ids)
    onSelectionChange(ids)
  }

  if (loading || !records || records.length === 0) {
    return null
  }

  const rowIds = records.map(record => record.id)

  const rows = sortedRecords.map(record => (
    <Row
      key={record.id}
      record={record}
      selectedIds={selectedIds}
      sortable={sortable}
      compact={compact}
      updateSelection={updateSelection}
      {...rest}
    >
      {columns.map(({ dataKey, ...other }) => (
        <Column key={dataKey} dataKey={dataKey} record={record} {...other} />
      ))}
    </Row>
  ))

  return (
    <div role="table">
      {compact && (
        <Row
          header
          rowIds={rowIds}
          selectedIds={selectedIds}
          compact={compact}
          updateSelection={updateSelection}
          {...rest}
        >
          {columns.map(({
            dataKey,
            label,
            cellRenderer, /* avoid passing to use defaultCellRenderer for header */
            ...other
          }) => (
            <Column
              key={dataKey}
              dataKey="label"
              record={{ label: label || dataKey }}
              header
              uppercase
              {...other}
            />
          ))}
        </Row>
      )}
      {sortable ? (
        <ReactSortable
          handle=".drag-handle"
          list={sortedRecords}
          setList={newSortedRecords => setSortedRecords(newSortedRecords)}
          onEnd={() => onSortingChange(sortedRecords)}
        >
          {rows}
        </ReactSortable>
      ) : rows}
    </div>
  )
}

DataTable.propTypes = {
  actions: Row.propTypes.actions,
  columns: PropTypes.array,
  compact: PropTypes.bool,
  loading: PropTypes.bool,
  onRowClick: Row.propTypes.onRowClick,
  onSelectionChange: PropTypes.func,
  onSortingChange: PropTypes.func,
  records: PropTypes.array,
  rowProps: Row.propTypes.rowProps,
  selectable: Row.propTypes.selectable,
  sortable: Row.propTypes.sortable
}

DataTable.defaultProps = {
  actions: Row.defaultProps.actions,
  columns: [],
  compact: false,
  loading: false,
  onRowClick: Row.defaultProps.onRowClick,
  onSelectionChange: () => null,
  onSortingChange: () => null,
  records: null,
  rowProps: Row.defaultProps.rowProps,
  selectable: Row.defaultProps.selectable,
  sortable: Row.defaultProps.sortable
}

export default DataTable
