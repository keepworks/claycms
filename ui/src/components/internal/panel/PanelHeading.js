import injectSheet from 'react-jss'
import React from 'react'

function PanelHeading({ classes, children }) {
  return <div className={classes.panelHeading}>{children}</div>
}

PanelHeading = injectSheet(({ typography, units }) => ({
  panelHeading: {
    ...typography.semiboldSquished,

    marginBottom: units.panelHeadingMarginBottom
  }
}))(PanelHeading)

export default PanelHeading
