import injectSheet from 'react-jss'
import React from 'react'
import { Link } from 'react-router-dom'

import FontIcon from 'components/FontIcon'

function BackLink({ classes, children, ...other }) {
  return (
    <Link className={classes.backLink} {...other}>
      <FontIcon name="arrow-left-thin" size="tiny" />
      {children}
    </Link>
  )
}

export default injectSheet(({ colors, typography, units }) => ({
  backLink: {
    ...typography.semiboldExtraSmallSquished,

    alignItems: 'center',
    color: colors.text_primary,
    display: 'flex',
    marginBottom: units.backLinkMarginBottom,

    '& .icon': {
      marginRight: 5
    }
  }
}))(BackLink)
