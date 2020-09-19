import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

const gutterSizes = {
  tiny: 5,
  small: 10,
  medium: 15,
  large: 20
}

function ItemBar({ classes, children }) {
  return (
    <div className={classes.itemBar}>
      {children}
    </div>
  )
}

ItemBar.propTypes = {
  children: PropTypes.node.isRequired,
  gutter: PropTypes.oneOf(Object.keys(gutterSizes)),
  justifyContent: PropTypes.string,
  reversed: PropTypes.bool
}

ItemBar.defaultProps = {
  gutter: 'tiny',
  justifyContent: 'space-between',
  reversed: false
}

export default injectSheet(() => ({
  itemBar: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: ({ reversed }) => (reversed ? 'row-reverse' : 'row'),
    justifyContent: ({ justifyContent }) => justifyContent,

    '& > *': {
      marginRight: ({ gutter }) => gutterSizes[gutter]
    },

    '& > *:last-child': {
      marginRight: 0
    }
  }
}))(ItemBar)
