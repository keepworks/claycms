import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function SidePaneFormFooter({ classes, children }) {
  return (
    <div className={classes.sidePaneFormFooter}>
      {children}
    </div>
  )
}

SidePaneFormFooter.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(() => ({
  sidePaneFormFooter: {
    float: 'right'
  }
}))(SidePaneFormFooter)
