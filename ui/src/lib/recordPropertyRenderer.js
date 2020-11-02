import _ from 'lodash'
import React from 'react'

import { CellContent } from 'components/internal/typography'
import ColorTile from 'components/internal/ColorTile'
import FontIcon from 'components/FontIcon'

const recordPropertyRenderer = field => ({ record }) => {
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

export default recordPropertyRenderer
