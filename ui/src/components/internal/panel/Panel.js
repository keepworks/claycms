import injectSheet from 'react-jss'
import React from 'react'

function Panel({ children, classes }) {
  return (
    <div className={classes.panel}>
      {children}
    </div>
  )
}

export default injectSheet(({ colors, shadows, units }) => ({
  panel: {
    backgroundColor: colors.panelBackground,
    borderRadius: units.panelBorderRadius,
    boxShadow: shadows.panel,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',

    '& + &': {
      marginTop: units.panelMarginTop
    }
  }
}))(Panel)
