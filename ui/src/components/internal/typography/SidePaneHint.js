import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function SidePaneHint({ classes, children, ...other }) {
  return (
    <BaseText
      tag="p"
      color="light"
      variant="regularSpaced"
      className={classes.sidePaneHint}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  sidePaneHint: {
    maxWidth: units.sidePaneHintMaxWidth
  }
}))(SidePaneHint)
