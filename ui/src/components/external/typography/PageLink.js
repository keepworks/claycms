import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'
import { TextLink as BaseTextLink } from 'components/typography'

function PageLink({ classes, ...other }) {
  return (
    <BaseTextLink className={classes.pageLink} {...other} />
  )
}

export default injectSheet(({ colors, typography }) => ({
  pageLink: {
    ...mixins.animateUnderline({ color: colors.text_primary, bottom: -2 }),
    ...typography.semiboldSquishedResponsive,

    color: colors.text_primary,
    display: 'inline-block'
  }
}))(PageLink)
