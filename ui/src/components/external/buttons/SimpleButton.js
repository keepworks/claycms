import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'

function SimpleButton({ disabled, label, classes }) {
  return (
    <button disabled={disabled} className={classes.button}>
      {label}
    </button>
  )
}

SimpleButton.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired
}

SimpleButton.defaultProps = {
  disabled: false
}

export default injectSheet(({
  colors, shadows, typography, units
}) => ({
  button: {
    ...mixins.transitionSimple(),
    ...typography.bold,

    backgroundColor: colors.externalButtonBackground,
    borderRadius: units.externalButtonBorderRadius,
    borderWidth: 0,
    boxShadow: shadows.externalButton,
    color: colors.text_darker,
    cursor: 'pointer',
    height: units.externalButtonHeight,
    minWidth: units.externalButtonWidth,
    textTransform: 'uppercase',
    paddingTop: 0,
    paddingRight: units.externalButtonHorizontalPadding,
    paddingBottom: 0,
    paddingLeft: units.externalButtonHorizontalPadding,

    '&[disabled]': {
      backgroundColor: colors.externalButtonBackground_disabled,
      boxShadow: 'none',
      color: colors.text_primary,
      pointerEvents: 'none'
    },

    '&:hover, &:focus': {
      color: colors.text_primary
    }
  }
}))(SimpleButton)
