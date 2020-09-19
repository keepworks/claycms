import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

const circleSize = 521

function CardWrapper({ classes, children }) {
  return (
    <div className={classes.cardWrapper}>
      {children}
    </div>
  )
}

CardWrapper.propTypes = {
  showSecondary: PropTypes.bool,
  children: PropTypes.node.isRequired
}

CardWrapper.defaultProps = {
  showSecondary: false
}

export default injectSheet(() => ({
  cardWrapper: {
    position: 'absolute',
    right: 0,

    '& > [data-card]:nth-of-type(1)': {
      ...mixins.transitionSimple(),

      opacity: ({ showSecondary }) => (showSecondary ? 0.21 : 1),
      transform: ({ showSecondary }) => (showSecondary ? 'scale(0.9, 0.8) translateY(-15%)' : 'scale(1, 1) translateY(0)'),
      zIndex: ({ showSecondary }) => (showSecondary ? 0 : 1)
    },

    '& > [data-card]:nth-of-type(2)': {
      ...mixins.transitionSimple(),

      opacity: ({ showSecondary }) => (showSecondary ? 1 : 0.21),
      position: 'absolute',
      transform: ({ showSecondary }) => (showSecondary ? 'scale(1, 1) translateY(-100%)' : 'scale(0.9, 0.8) translateY(-100%)'),
      zIndex: ({ showSecondary }) => (showSecondary ? 1 : 0)
    },

    '&::before': {
      ...mixins.circle({ size: circleSize }),

      right: -0.4 * circleSize,
      bottom: -0.5 * circleSize
    }
  }
}))(CardWrapper)
