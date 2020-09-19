import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'

function EmptyWrapper({ classes, children }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loaderCircle_small} />
      <div className={classes.loaderCircle_medium} />
      <div className={classes.loaderCircle_large} />
      {children}
    </div>
  )
}

export default injectSheet(({ colors, units }) => {
  const circleStyles = size => ({
    ...mixins.size(size),

    backgroundColor: colors.emptyWrapperCircleBackground,
    borderRadius: '50%',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: -1
  })

  return {
    wrapper: {
      ...mixins.size('100%', units.emptyWrapperHeight),

      alignItems: 'center',
      backgroundColor: colors.emptyWrapperBackground,
      borderColor: colors.emptyWrapperBorder,
      borderRadius: units.emptyWrapperBorderRadius,
      borderStyle: 'solid',
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 0
    },
    loaderCircle_small: {
      ...circleStyles(units.emptyWrapperCircleSize_small),

      top: units.emptyWrapperCircleShiftTop_small,
      right: units.emptyWrapperCircleShiftRight_small
    },
    loaderCircle_medium: {
      ...circleStyles(units.emptyWrapperCircleSize_medium),

      top: units.emptyWrapperCircleShiftTop_medium,
      left: units.emptyWrapperCircleShiftLeft_medium
    },
    loaderCircle_large: {
      ...circleStyles(units.emptyWrapperCircleSize_large),

      top: units.emptyWrapperCircleShiftTop_large,
      right: units.emptyWrapperCircleShiftRight_large
    }
  }
})(EmptyWrapper)
