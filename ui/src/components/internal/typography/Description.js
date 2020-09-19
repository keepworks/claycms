import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function Description({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="pale"
      variant="regularSmallSpacedSquished"
      className={classes.description}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  description: {
    lineHeight: 1.83,
    maxWidth: units.internalDescriptionMaxWidth,
    textAlign: 'center'
  }
}))(Description)
