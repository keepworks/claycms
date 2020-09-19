import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'
import { TextLink as BaseTextLink } from 'components/typography'

function TextLink({ classes, ...other }) {
  return (
    <BaseTextLink className={classes.textLink} {...other} />
  )
}

export default injectSheet(({ colors, typography, units }) => ({
  textLink: {
    ...mixins.animateUnderline({ color: colors.text_primary, bottom: -3 }),
    ...typography.semiboldSmallSquished,

    color: colors.text_primary,
    display: 'inline-block',
    marginTop: units.externalTextLinkMarginTop
  }
}))(TextLink)
