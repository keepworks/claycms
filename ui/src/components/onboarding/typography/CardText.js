import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function CardText({ children, classes, ...other }) {
  return (
    <BaseText
      tag="p"
      color="dark"
      variant="regularMedium"
      className={classes.cardText}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  cardText: {
    '& + p': {
      marginTop: units.cardTextSpacing
    }
  }
}))(CardText)
