import injectSheet from 'react-jss'
import React from 'react'

import * as mixins from 'styles/mixins'
import BaseText from 'components/typography/BaseText'

function Heading({ children, classes, ...other }) {
  return (
    <BaseText
      tag="h1"
      color="light"
      variant="boldExtraLargeResponsive"
      className={classes.heading}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  heading: {
    ...mixins.responsiveProperties({
      marginTop: units.externalHeadingMarginTopResponsive,
      width: units.externalHeadingWidthResponsive
    })
  }
}))(Heading)
