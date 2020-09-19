import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import { TextLink as BaseTextLink } from 'components/typography'

function TextLink({ variant, classes, ...other }) {
  return (
    <BaseTextLink className={classNames(classes.textLink, classes[`textLink_${variant}`])} {...other} />
  )
}

TextLink.propTypes = {
  variant: PropTypes.oneOf([ 'dark', 'light' ])
}

TextLink.defaultProps = {
  variant: 'light'
}

export default injectSheet(({ colors, typography }) => ({
  textLink: {
    ...typography.boldSquished
  },
  textLink_dark: {
    ...mixins.animateUnderline({ color: colors.text_dark, bottom: -2 }),

    color: colors.text_dark
  },
  textLink_light: {
    ...mixins.animateUnderline({ color: colors.text_light, bottom: -2 }),

    color: colors.text_light
  }
}))(TextLink)
