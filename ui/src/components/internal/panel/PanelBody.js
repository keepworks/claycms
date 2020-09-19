import injectSheet from 'react-jss'
import React from 'react'

function PanelBody({ children, classes }) {
  return (
    <div className={classes.panelBody}>
      {children}
    </div>
  )
}

export default injectSheet(({ units }) => ({
  panelBody: {
    paddingTop: units.panelBodyVerticalPadding,
    paddingRight: units.panelBodyHorizontalPadding,
    paddingBottom: units.panelBodyVerticalPadding,
    paddingLeft: units.panelBodyHorizontalPadding
  }
}))(PanelBody)
