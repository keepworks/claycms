import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function PageTitle({ classes, children, ...other }) {
  return (
    <BaseText
      tag="h1"
      color="dark"
      variant="lightExtraLarge"
      className={classes.pageTitle}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  pageTitle: {
    alignItems: 'center',
    display: 'inline-flex',
    marginRight: units.pageTitleMarginRight,
    marginBottom: units.pageTitleMarginBottom
  }
}))(PageTitle)
