import PropTypes from 'prop-types'
import React from 'react'
import injectSheet from 'react-jss'

function Body({ classes, children }) {
  return (
    <div className={classes.body}>
      {children}
    </div>
  )
}

Body.propTypes = {
  children: PropTypes.node.isRequired
}

export default injectSheet(() => ({
  body: {
    display: 'flex',
    position: 'relative'
  }
}))(Body)
