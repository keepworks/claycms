import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import cleanProps from 'lib/cleanProps'

function FilledButton({ isActive, disabled, label, size, variant, classes, ...other }) {
  return (
    <button
      disabled={disabled}
      className={classNames(
        classes.button,
        classes[`button_${size}`],
        classes[`button_${variant}`],
        { [classes[`button_${variant}Active`]]: isActive }
      )}
      {...cleanProps(other)}
    >
      {label}
    </button>
  )
}

FilledButton.propTypes = {
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf([ 'tiny', 'small', 'normal', 'large' ]),
  type: PropTypes.oneOf([ 'submit', 'button' ]),
  variant: PropTypes.oneOf([ 'clear', 'color', 'flat' ])
}

FilledButton.defaultProps = {
  isActive: false,
  disabled: false,
  size: 'normal',
  type: 'submit',
  variant: 'color'
}

export default injectSheet(({ colors, gradients, shadows, typography, units }) => ({
  button: {
    ...mixins.transitionSimple(),

    borderRadius: units.buttonBorderRadius,
    cursor: 'pointer',
    paddingTop: 0,
    paddingBottom: 0,
    whiteSpace: 'nowrap',

    '&[disabled]': {
      pointerEvents: 'none'
    },

    '&:not(:last-child)': {
      marginRight: units.buttonMarginRight
    }
  },
  button_tiny: {
    ...typography.regularSmallSpaced,

    height: units.buttonHeight_tiny,
    minWidth: units.buttonMinWidth_tiny,
    paddingRight: units.buttonHorizontalPadding_tiny,
    paddingLeft: units.buttonHorizontalPadding_tiny
  },
  button_small: {
    ...typography.bold,

    height: units.buttonHeight_small,
    minWidth: units.buttonMinWidth_small,
    paddingRight: units.buttonHorizontalPadding_normal,
    paddingLeft: units.buttonHorizontalPadding_normal
  },
  button_normal: {
    ...typography.bold,

    height: units.buttonHeight_normal,
    minWidth: units.buttonMinWidth_normal,
    paddingRight: units.buttonHorizontalPadding_normal,
    paddingLeft: units.buttonHorizontalPadding_normal
  },
  button_large: {
    ...typography.bold,

    height: units.buttonHeight_large,
    minWidth: units.buttonMinWidth_large,
    paddingRight: units.buttonHorizontalPadding_normal,
    paddingLeft: units.buttonHorizontalPadding_normal
  },
  button_clear: {
    ...typography.regularSmallSpaced,

    background: 'none',
    border: 'none',
    color: colors.text_pale
  },
  button_color: {
    backgroundImage: gradients.button,
    borderWidth: 0,
    boxShadow: ({ size }) => size !== 'tiny' && shadows.button_color,
    color: colors.text_light,
    position: 'relative',
    textTransform: 'uppercase',
    zIndex: 0,

    '&[disabled]': {
      boxShadow: 'none',
      opacity: 0.3
    },

    '&::after': {
      ...mixins.transitionSimple(),

      backgroundImage: gradients.button_colorHover,
      borderRadius: units.buttonBorderRadius,
      content: '" "',
      opacity: 0,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1
    },

    '&:hover, &:focus': {
      boxShadow: shadows.button_hover,

      '&::after': {
        opacity: 1
      }
    }
  },
  button_flat: {
    ...typography.mediumSquished,

    backgroundColor: colors.buttonBackground_flat,
    borderColor: colors.buttonBorder_flat,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.text_dark,

    '&[disabled]': {
      color: colors.text_darkDisabled
    },

    '&:hover, &:focus': {
      backgroundColor: colors.button_flatHover,
      borderColor: 'transparent',
      boxShadow: shadows.button_flatHover
    }
  },
  button_flatActive: {
    backgroundColor: colors.button_flatHover,
    borderColor: 'transparent',
    boxShadow: shadows.button_flatHover
  }
}))(FilledButton)
