import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function DialogDescription({ children, classes, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="regularSpaced"
      className={classes.dialogDescription}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  dialogDescription: {
    marginBottom: units.dialogDescriptionMarginBottom
  }
}))(DialogDescription)
