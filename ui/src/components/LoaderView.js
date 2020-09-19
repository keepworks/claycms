import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import loaderImage from 'images/loader.gif'

function LoaderView({ overlay, classes }) {
  return (
    <div className={classNames(classes.loaderView, overlay && classes.loaderView_overlay)}>
      <img src={loaderImage} alt="Loading..." />
    </div>
  )
}

LoaderView.propTypes = {
  overlay: PropTypes.bool
}

LoaderView.defaultProps = {
  overlay: false
}

export default injectSheet(() => ({
  loaderView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  loaderView_overlay: {
    background: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  }
}))(LoaderView)
