import injectSheet from 'react-jss'
import React from 'react'

function Code({ classes, children }) {
  return (
    <code className={classes.code}>
      {children}
    </code>
  )
}

export default injectSheet(({ colors, units }) => ({
  code: {
    display: 'block',
    background: colors.codeBackground,
    borderRadius: units.codeBorderRadius,
    paddingTop: units.codeVerticalPadding,
    paddingRight: units.codeHorizontalPadding,
    paddingBottom: units.codeVerticalPadding,
    paddingLeft: units.codeHorizontalPadding
  }
}))(Code)
