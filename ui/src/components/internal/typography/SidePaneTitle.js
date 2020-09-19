import injectSheet from 'react-jss'
import React from 'react'

import BaseText from 'components/typography/BaseText'

function SidePaneTitle({ classes, children, ...other }) {
  return (
    <BaseText
      tag="h1"
      color="light"
      variant="lightExtraLargeSquished"
      className={classes.sidePaneTitle}
      {...other}
    >
      {children}
    </BaseText>
  )
}

export default injectSheet(({ units }) => ({
  sidePaneTitle: {
    marginBottom: units.sidePaneTitleMarginBottom
  }
}))(SidePaneTitle)
