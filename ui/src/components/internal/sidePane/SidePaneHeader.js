import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import FontIcon from 'components/FontIcon'

function SidePaneHeader({ onArrowClick, classes, children }) {
  return (
    <div className={classes.sidePaneHeader}>
      <FontIcon name="arrow-left-thin" size="small" onClick={onArrowClick} />
      {children}
    </div>
  )
}

SidePaneHeader.propTypes = {
  onArrowClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

SidePaneHeader.defaultProps = {
  onArrowClick: () => null
}

export default injectSheet(({ colors, gradients, shadows, units }) => ({
  sidePaneHeader: {
    boxShadow: shadows.sidePaneHeader,
    backgroundImage: gradients.sidePaneHeader,
    flex: '0 0 auto',
    padding: units.sidePaneHeaderPadding,
    position: 'relative',

    '& .icon': {
      color: colors.sidePaneHeaderArrow,
      cursor: 'pointer',
      position: 'absolute',
      top: units.sidePaneHeaderArrowTop,
      left: units.sidePaneHeaderArrowLeft
    }
  }
}))(SidePaneHeader)
