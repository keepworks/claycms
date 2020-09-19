import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'
import BaseText from 'components/typography/BaseText'

function PageHeading({ children, classes, ...other }) {
  return (
    <BaseText
      tag="h1"
      color="darker"
      variant="boldExtraLargeResponsive"
      className={classes.pageHeading}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  pageHeading: {
    ...mixins.responsiveProperties({
      marginTop: units.externalPageHeadingMarginTopResponsive,
      marginBottom: units.externalPageHeadingMarginBottomResponsive
    })
  }
}))(PageHeading)
