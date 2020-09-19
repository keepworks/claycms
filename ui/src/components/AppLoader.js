import injectSheet from 'react-jss'
import React from 'react'

import loaderImage from 'images/loader.gif'

function AppLoader({ classes }) {
  return (
    <div className={classes.appLoader}>
      <img src={loaderImage} alt="Loading..." />
    </div>
  )
}

export default injectSheet(({ colors, zIndexes }) => ({
  appLoader: {
    backgroundColor: colors.emptyWrapperBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: zIndexes.appLoader
  }
}))(AppLoader)
