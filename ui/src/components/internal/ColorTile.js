import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import CopyToClipboard from 'components/internal/CopyToClipboard'

function ColorTile({ classes, color, onClick }) {
  const renderTile = onTileClick => (
    <span
      role="button"
      tabIndex={-1}
      onKeyPress={onTileClick}
      className={classes.base}
      onClick={onTileClick}
      style={{ backgroundColor: color }}
    />
  )

  if (onClick) {
    return renderTile(onClick)
  }

  return (
    <CopyToClipboard
      description={color}
      text={color}
      render={renderTile}
    />
  )
}

ColorTile.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  spaced: PropTypes.bool
}

ColorTile.defaultProps = {
  color: '',
  onClick: null,
  spaced: false
}

export default injectSheet(({ colors, units }) => ({
  base: {
    background: colors.colorTileDefaultBackground,
    borderRadius: units.colorTileBorderRadius,
    boxShadow: colors.colorTileBoxShadow,
    cursor: 'pointer',
    display: 'inline-block',
    height: units.colorTileColorHeight,
    marginLeft: ({ spaced }) => spaced && units.colorTileMargin,
    marginRight: ({ spaced }) => spaced && units.colorTileMargin,
    width: units.colorTileColorWidth
  }
}))(ColorTile)
