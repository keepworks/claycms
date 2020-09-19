import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function PageSubTitle({ classes, children, ...other }) {
  return (
    <BaseText
      tag="h2"
      color="dark"
      variant="semiboldSquished"
      className={classes.pageSubTitle}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(() => ({
  pageSubTitle: {
    marginBottom: 10,
    marginTop: 15
  }
}))(PageSubTitle)
