import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import FontIcon from 'components/FontIcon'

function IconButton({ icon, onClick, size, variant, classes }) {
  return (
    <button
      type="button"
      className={classNames(
        classes.iconButton,
        classes.iconButtonSize,
        classes[`iconButton_${variant}`]
      )}
      onClick={onClick}
    >
      <FontIcon name={icon} size={size} />
    </button>
  )
}

IconButton.propTypes = {
  heavy: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(FontIcon.sizes)),
  variant: PropTypes.oneOf([ 'color', 'flat' ])
}

IconButton.defaultProps = {
  heavy: false,
  onClick: null,
  size: 'tiny',
  variant: 'flat'
}

export default injectSheet(({ colors, gradients, shadows, units }) => ({
  iconButton: {
    ...mixins.transitionSimple(),

    alignItems: 'center',
    borderRadius: '50%',
    borderWidth: 0,
    boxShadow: props => (props.heavy ? shadows.iconButton_heavy : shadows.iconButton),
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: 0,
    verticalAlign: 'top',

    '&:hover, &:focus': {
      boxShadow: shadows.iconButton_hover
    },

    '& + &': {
      marginRight: units.iconButtonHorizontalMargin,
      marginLeft: units.iconButtonHorizontalMargin
    }
  },
  iconButton_flat: {
    backgroundColor: colors.iconButtonBackground,
    color: colors.text_pale
  },
  iconButton_color: {
    backgroundImage: gradients.button,
    color: colors.text_light
  },
  iconButtonSize: ({ size }) => ({
    ...mixins.size(units[`iconButtonSize_${size}`])
  })
}))(IconButton)
