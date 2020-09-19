import injectSheet from 'react-jss'
import React from 'react'

function MenuHeading({ children, classes }) {
  return (
    <div role="menuitem" tabIndex={-1} className={classes.menuHeading}>
      {children}
    </div>
  )
}

export default injectSheet(({ colors, typography, units }) => ({
  menuHeading: {
    ...typography.lightSmall,

    color: colors.text_pale,
    padding: [ units.menuHeadingHorizontalPadding, units.menuHeadingVerticalPadding ]
  }
}))(MenuHeading)
