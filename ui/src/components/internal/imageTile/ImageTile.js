import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function ImageTile({ src, alt, onClick, classes }) {
  const clickProps = {}

  if (onClick) {
    clickProps.onClick = onClick
    clickProps.role = 'button'
    clickProps.tabIndex = 0
  }

  return (
    <div className={classes.imageTile} {...clickProps}>
      <div className={classes.imageHolder}>
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}

ImageTile.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

ImageTile.defaultProps = {
  onClick: null
}

export default injectSheet(({ colors, units, shadows }) => ({
  imageTile: {
    ...mixins.transitionSimple(),

    backgroundColor: colors.imageTileBackground,
    borderRadius: units.imageTileBorderRadius,
    boxShadow: shadows.imageTile,
    cursor: props => props.onClick && 'pointer',
    overflow: 'hidden',
    paddingTop: '100%', // Trick to maintain aspect ratio
    position: 'relative',
    width: '100%',

    '&:hover': {
      boxShadow: props => props.onClick && shadows.imageTile_hover
    }
  },
  imageHolder: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: units.imageTileInnerPadding,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    '& img': {
      maxHeight: '100%',
      maxWidth: '100%'
    }
  }
}))(ImageTile)
