import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'
import ItemBar from 'components/ItemBar'
import Tag from 'components/internal/Tag'
import { Asset } from 'models'

function AssetBox({ actions, asset, classes }) {
  const [ isHovered, setIsHovered ] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      className={classNames(
        classes.assetBox,
        { [classes.assetBox_hover]: isHovered }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ItemBar>
        <Tag>{Asset.getExtension(asset)}</Tag>
        <div className={classes.assetActions}>
          {actions.map(({ icon, key, onClick, render }) => {
            if (render) {
              return (
                <div key={key} className={classes.assetAction}>
                  {render(asset)}
                </div>
              )
            }

            return (
              <div
                key={icon}
                role="button"
                tabIndex={-1}
                className={classes.assetAction}
                onClick={(e) => {
                  e.stopPropagation()
                  onClick(asset, e)
                }}
                onKeyPress={(e) => {
                  e.stopPropagation()
                  onClick(asset, e)
                }}
              >
                <FontIcon name={icon} size="small" />
              </div>
            )
          })}
        </div>
      </ItemBar>

      <p className={classes.assetName}>
        {Asset.getFullName(asset)}
      </p>
      <p className={classes.assetSize}>
        {Asset.getFormattedSize(asset)}
      </p>
    </div>
  )
}

AssetBox.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func
    }),
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired
    })
  ]))
}

AssetBox.defaultProps = {
  actions: []
}

export default injectSheet(({ colors, shadows, typography, units }) => ({
  assetBox: {
    ...mixins.size(240, 170),
    ...mixins.transitionSimple(),

    boxShadow: shadows.assetBox,
    backgroundColor: colors.assetBoxBackground,
    cursor: 'pointer',
    marginRight: units.assetBoxMarginRight,
    marginBottom: units.assetBoxMarginBottom,
    padding: units.assetBoxPadding,
    position: 'relative'
  },
  assetBox_hover: {
    boxShadow: shadows.assetBox_hover,
    cursor: 'pointer',

    '& $assetName, $assetSize': {
      color: colors.text_primary
    },

    '& $assetActions': {
      opacity: 1,
      pointerEvents: 'auto'
    }
  },
  assetName: {
    ...mixins.transitionSimple(),
    ...typography.semiboldSmallSquished,

    color: colors.text_dark,
    paddingTop: units.assetBoxNamePaddingTop,
    paddingBottom: units.assetBoxNamePaddingBottom
  },
  assetSize: {
    ...mixins.transitionSimple(),
    ...typography.regularSmallSpacedSquished,

    color: colors.text_pale
  },
  assetActions: {
    ...mixins.transitionSimple(),

    display: 'flex',
    opacity: 0,
    pointerEvents: 'none'
  },
  assetAction: {
    ...mixins.transitionSimple(),

    display: 'flex',
    color: colors.text_pale,
    cursor: 'pointer',

    '&:hover': {
      color: colors.text_dark
    },

    '&:not(:last-child)': {
      marginRight: units.assetBoxActionMarginRight
    }
  }
}))(AssetBox)
