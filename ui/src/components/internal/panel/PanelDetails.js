import injectSheet from 'react-jss'
import React from 'react'

function PanelDetails({ children, classes }) {
  return <div className={classes.panelDetails}>{children}</div>
}

export default injectSheet(({ typography, units }) => ({
  panelDetails: {
    ...typography.lightSpaced,

    marginBottom: units.panelDetailsMarginBottom,

    '& b': {
      ...typography.semiboldSmall
    }
  }
}))(PanelDetails)
