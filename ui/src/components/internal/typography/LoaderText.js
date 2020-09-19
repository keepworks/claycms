import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function LoaderText({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="pale"
      variant="regularMediumSquished"
      className={classes.loaderText}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  loaderText: {
    marginBottom: units.loaderTextMarginBottom
  }
}))(LoaderText)
