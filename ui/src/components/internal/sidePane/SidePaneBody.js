import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function SidePaneBody({ classes, children }) {
  return (
    <div className={classes.sidePaneBody}>
      {children}
    </div>
  )
}

SidePaneBody.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(({ units }) => ({
  sidePaneBody: {
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: units.sidePaneBodyPadding,
    position: 'relative' // For positioning submit button
  }
}))(SidePaneBody)
