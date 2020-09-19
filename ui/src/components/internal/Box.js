import injectSheet from 'react-jss'
import React from 'react'

function Box({ children, classes }) {
  return (
    <div className={classes.box}>
      {children}
    </div>
  )
}

export default injectSheet(({ colors, units }) => ({
  box: {
    alignItems: 'center',
    backgroundColor: colors.internalBoxBackground,
    borderColor: colors.internalBoxBorder,
    borderRadius: units.internalBoxBorderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: units.internalBoxPaddingVertical,
    paddingBottom: units.internalBoxPaddingVertical
  }
}))(Box)
