import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function GridItem({ classes, children }) {
  return (
    <div className={classes.gridItem}>
      {children}
    </div>
  )
}

GridItem.propTypes = {
  start: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  end: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  children: PropTypes.node.isRequired
}

GridItem.defaultProps = {
  start: 1,
  end: 16
}

export default injectSheet(() => ({
  gridItem: ({ start, end }) => ({
    gridColumnStart: start,
    gridColumnEnd: end
  })
}))(GridItem)
