import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import * as mixins from 'styles/mixins'

const circleColors = [
  '#58efb1',
  '#99b9f6',
  '#fde198',
  '#ff7a87',
  '#9c6ce3'
]

function DataTiles({
  loading, records, tileLink, classes
}) {
  if (loading || !records || records.length === 0) {
    return null
  }

  return (
    <div className={classes.dataTiles}>
      {records.map((record, index) => (
        <Link key={record.id} to={tileLink(record.id)}>
          <div className={classes.dataTile}>
            <div
              style={{ backgroundColor: circleColors[index % circleColors.length] }}
              className={classes.circle}
            />
            {record.name}
          </div>
        </Link>
      ))}
    </div>
  )
}

DataTiles.propTypes = {
  loading: PropTypes.bool,
  records: PropTypes.array,
  tileLink: PropTypes.func.isRequired
}

DataTiles.defaultProps = {
  loading: false,
  records: null
}

export default injectSheet(({
  colors, shadows, typography, units
}) => ({
  dataTiles: {
    display: 'grid',
    gridColumnGap: units.dataTilesColumnGap,
    gridRowGap: units.dataTilesRowGap,
    gridTemplateColumns: '1fr 1fr 1fr'
  },
  dataTile: {
    ...mixins.size('100%', units.dataTileHeight),
    ...mixins.transitionSimple(),
    ...typography.semibold,

    alignItems: 'center',
    backgroundColor: colors.dataTileBackground,
    borderRadius: units.dataTileBorderRadius,
    boxShadow: shadows.dataTile,
    color: colors.text_dark,
    display: 'flex',
    overflow: 'hidden',
    paddingRight: units.dataTileHorizontalPadding,
    paddingLeft: units.dataTileHorizontalPadding,
    position: 'relative',

    '&:hover': {
      boxShadow: shadows.dataTitle_hover,

      '& $circle': {
        ...mixins.size(units.dataTileCircleSize_large),

        top: units.dataTileCircleShiftTop_large,
        left: units.dataTileCircleShiftLeft_large
      }
    }
  },
  circle: {
    ...mixins.size(units.dataTileCircleSize),
    ...mixins.transitionSimple(),

    borderRadius: '50%',
    position: 'absolute',
    top: (units.dataTileHeight - units.dataTileCircleSize) / 2,
    left: units.dataTileCircleShiftLeft
  }
}))(DataTiles)
