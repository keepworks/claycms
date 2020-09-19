import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function PageText({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="darker"
      variant="lightMediumResponsive"
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
}))(PageText)
