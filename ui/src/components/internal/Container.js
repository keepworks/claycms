import injectSheet from 'react-jss'
import React from 'react'

function Container({ classes, children }) {
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default injectSheet(({ units }) => ({
  container: {
    paddingRight: units.internalContainerHorizontalPadding,
    paddingLeft: units.internalContainerHorizontalPadding,
    width: '100%'
  }
}))(Container)
