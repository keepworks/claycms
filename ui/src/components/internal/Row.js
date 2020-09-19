import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function Row({ classes, children }) {
  return (
    <div className={classes.row}>
      {children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ units }) => ({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: units.rowMarginHorizontal,
    marginLeft: units.rowMarginHorizontal
  }
}))(Row)
