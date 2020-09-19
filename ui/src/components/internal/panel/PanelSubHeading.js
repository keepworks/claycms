import injectSheet from 'react-jss'
import React from 'react'

function PanelSubHeading({ classes, children }) {
  return <div className={classes.panelSubHeading}>{children}</div>
}

PanelSubHeading = injectSheet(({ typography, units }) => ({
  panelSubHeading: {
    ...typography.semibold,

    marginBottom: units.panelSubHeadingMarginBottom
  }
}))(PanelSubHeading)

export default PanelSubHeading
