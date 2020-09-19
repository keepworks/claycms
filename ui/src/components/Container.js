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
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: units.containerHorizontalPadding,
    paddingRight: units.containerHorizontalPadding,
    width: units.containerWidth + (2 * units.containerHorizontalPadding)
  }
}))(Container)
