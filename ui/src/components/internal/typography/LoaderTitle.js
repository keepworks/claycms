import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function LoaderTitle({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="semiboldLargeSquished"
      className={classes.loaderTitle}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  loaderTitle: {
    marginTop: units.loaderTitleMarginTop,
    marginBottom: units.loaderTitleMarginBottom
  }
}))(LoaderTitle)
