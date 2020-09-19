import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function CardHeading({ children, classes, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="semiboldExtraLarge"
      className={classes.cardHeading}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  cardHeading: {
    '& + p': {
      marginTop: units.cardHeadingSpacing
    }
  }
}))(CardHeading)
