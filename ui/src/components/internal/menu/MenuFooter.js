import injectSheet from 'react-jss'
import React from 'react'

function MenuFooter({
  children, classes
}) {
  return (
    <div className={classes.menuFooter}>
      {children}
    </div>
  )
}

export default injectSheet(({ colors, typography, units }) => ({
  menuFooter: {
    ...typography.regularSmallSquished,

    alignItems: 'center',
    backgroundColor: colors.menuSectionBackground,
    borderTopColor: colors.menuSectionBorder,
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    display: 'flex',
    height: units.menuFooterHeight
  }
}))(MenuFooter)
