import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function PageSubHeading({ classes, children, ...other }) {
  return (
    <BaseText
      tag="h2"
      color="darker"
      variant="semiboldSquishedResponsive"
      className={classes.pageText}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  pageText: {
    '& + *': {
      marginTop: units.externalParagraphMarginTop
    }
  }
}))(PageSubHeading)
