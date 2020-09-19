import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function Column({ bordered, extraPadded, classes, children }) {
  return (
    <div className={classNames(
      classes.column,
      {
        [classes.bordered]: bordered,
        [classes.extraPadded]: extraPadded
      }
    )}
    >
      {children}
    </div>
  )
}

Column.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  extraPadded: PropTypes.bool,
  width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

Column.defaultProps = {
  bordered: false,
  extraPadded: false,
  width: null
}

export default injectSheet(({ colors, units }) => ({
  column: {
    flexBasis: ({ width }) => width,
    flexGrow: ({ width }) => (width ? 0 : 1), // 0 is falsey
    paddingRight: units.columnPaddingHorizontal,
    paddingLeft: units.columnPaddingHorizontal
  },
  bordered: {
    '& + &': {
      borderLeft: `solid 1px ${colors.columnBorder}`
    }
  },
  extraPadded: {
    '&:not(:first-child)': {
      paddingLeft: units.columnPaddingHorizontal * 4
    },

    '&:not(:last-child)': {
      paddingRight: units.columnPaddingHorizontal * 4
    }
  }
}))(Column)
