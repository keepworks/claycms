import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function Text({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="darker"
      variant="regularMediumResponsive"
      className={classes.text}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  text: {
    marginTop: units.externalTextMarginTop
  }
}))(Text)
