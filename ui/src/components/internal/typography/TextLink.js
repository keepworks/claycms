import classNames from 'classnames'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import React from 'react'

import * as mixins from 'styles/mixins'
import { TextLink as BaseTextLink } from 'components/typography'

function TextLink({ inherit, variant, classes, ...other }) {
  return (
    <BaseTextLink className={classNames(classes.textLink, classes[`textLink_${variant}`])} {...other} />
  )
}

TextLink.propTypes = {
  inherit: PropTypes.bool,
  variant: PropTypes.oneOf([ 'dark', 'pale' ])
}

TextLink.defaultProps = {
  inherit: false,
  variant: 'dark'
}

export default injectSheet(({ colors, typography }) => ({
  textLink: ({ inherit }) => {
    const inheritStyles = inherit && {
      fontSize: 'inherit',
      lineHeight: 'inherit'
    }

    return {
      ...typography.semiboldExtraSmallSquished,
      ...inheritStyles
    }
  },
  textLink_dark: {
    ...mixins.underline({ color: colors.text_dark, bottom: -2 }),

    color: colors.text_dark
  },
  textLink_pale: {
    ...mixins.underline({ color: colors.text_pale, bottom: -2 }),

    color: colors.text_pale
  }
}))(TextLink)
