import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import DefaultCellWrapper from 'components/internal/dataTable/DefaultCellWrapper'

const defaultCellRenderer = ({ record, dataKey }) => {
  const value = _.get(record, dataKey)

  if (value === undefined) {
    throw new Error(`${dataKey} is not a valid value for dataKey.`)
  }

  return value
}

function Column({
  cellRenderer,
  cellWrapper: Wrapper,
  dataKey,
  record,
  ...other
}) {
  return (
    <Wrapper {...other}>
      {cellRenderer({ record, dataKey })}
    </Wrapper>
  )
}

Column.propTypes = {
  cellRenderer: PropTypes.func,
  cellWrapper: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  dataKey: PropTypes.string.isRequired,
  flexGrow: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  record: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

Column.defaultProps = {
  cellRenderer: defaultCellRenderer,
  cellWrapper: DefaultCellWrapper,
  flexGrow: 0,
  width: 125
}

export default Column
