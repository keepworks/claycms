import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

function HintBox({ variant, classes, children }) {
  return (
    <div className={classNames(classes.hintBox, classes[`hintBox_${variant}`])}>
      {children}
    </div>
  )
}

HintBox.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([ 'light', 'dark', 'failure' ])
}

HintBox.defaultProps = {
  variant: 'light'
}

export default injectSheet(({ colors, units }) => ({
  hintBox: {
    borderColor: colors.hintBoxBorder,
    borderRadius: units.hintBoxBorderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: units.hintBoxVerticalPadding,
    paddingRight: units.hintBoxPaddingRight,
    paddingBottom: units.hintBoxVerticalPadding,
    paddingLeft: units.hintBoxPaddingLeft
  },
  hintBox_light: {
    backgroundColor: colors.hintBoxBackground_light
  },
  hintBox_dark: {
    backgroundColor: colors.hintBoxBackground_dark
  },
  hintBox_failure: {
    borderColor: colors.hintBoxBorder_alert
  }
}))(HintBox)
