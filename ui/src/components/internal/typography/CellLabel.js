import React from 'react'
import injectSheet from 'react-jss'

import BaseText from 'components/typography/BaseText'

function CellLabel({ classes, children, ...other }) {
  return (
    <BaseText
      className={classes.cellLabel}
      tag="p"
      color="pale"
      variant="lightSmall"
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet({
  cellLabel: {
    lineHeight: 1,
    paddingBottom: 10
  }
})(CellLabel)
